import { Injectable, signal } from '@angular/core';

export interface UsuarioConta {
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginManager {
  readonly usuarioAtual = signal<UsuarioConta | null>(null);
}
