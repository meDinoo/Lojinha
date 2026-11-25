import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Produto } from '../models/produto';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/api/Produtos`;

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.endpoint);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.endpoint}/${id}`);
  }

  pesquisar(termo: string): Observable<Produto[]> {
    const params = new HttpParams().set('busca', termo.trim());
    return this.http.get<Produto[]>(this.endpoint, { params });
  }
}