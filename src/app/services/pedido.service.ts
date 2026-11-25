import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CriarPedidoRequest, PedidoResposta } from '../models/pedido';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/api/Pedidos`;

  criar(pedido: CriarPedidoRequest): Observable<PedidoResposta> {
    return this.http.post<PedidoResposta>(this.endpoint, pedido);
  }

  listarMeus(): Observable<PedidoResposta[]> {
    return this.http.get<PedidoResposta[]>(this.endpoint);
  }
}