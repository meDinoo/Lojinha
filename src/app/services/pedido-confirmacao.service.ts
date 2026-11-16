import { Injectable, signal } from '@angular/core';
import { ConfirmacaoPedido } from '../models/pedido';

@Injectable({ providedIn: 'root' })
export class PedidoConfirmacaoService {
  readonly ultimoPedidoConfirmado = signal<ConfirmacaoPedido | null>(null);

  registrarConfirmacao(pedido: ConfirmacaoPedido): void {
    this.ultimoPedidoConfirmado.set(pedido);
  }

  limparConfirmacao(): void {
    this.ultimoPedidoConfirmado.set(null);
  }
}
