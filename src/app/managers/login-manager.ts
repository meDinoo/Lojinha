import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CadastroRequest, LoginRequest, LoginResposta, UsuarioConta } from '../models/autenticacao';

@Injectable({ providedIn: 'root' })
export class LoginManager {
  private readonly http = inject(HttpClient);
  private readonly storageKey = 'lojinha.session';
  readonly usuarioAtual = signal<UsuarioConta | null>(this.loadSession()?.usuario ?? null);

  get token(): string | null {
    return this.loadSession()?.token ?? null;
  }

  login(data: LoginRequest): Observable<LoginResposta> {
    return this.http.post<LoginResposta>(`${environment.apiUrl}/login`, data).pipe(
      tap((response) => {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem(this.storageKey, JSON.stringify(response));
        }
        this.usuarioAtual.set(response.usuario);
      }),
    );
  }

  cadastrar(data: CadastroRequest): Observable<UsuarioConta> {
    return this.http.post<UsuarioConta>(`${environment.apiUrl}/login/cadastro`, data);
  }

  sair(): void {
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(this.storageKey);
    this.usuarioAtual.set(null);
  }

  private loadSession(): LoginResposta | null {
    if (typeof sessionStorage === 'undefined') return null;
    const value = sessionStorage.getItem(this.storageKey);
    if (!value) return null;
    try {
      const session = JSON.parse(value) as LoginResposta;
      if (!session.token || !session.usuario || !session.expiraEm || Date.parse(session.expiraEm) <= Date.now()) {
        sessionStorage.removeItem(this.storageKey);
        return null;
      }
      return session;
    } catch {
      sessionStorage.removeItem(this.storageKey);
      return null;
    }
  }
}