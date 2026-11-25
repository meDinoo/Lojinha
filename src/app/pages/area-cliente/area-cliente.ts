import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginManager } from '../../managers/login-manager';
import { PedidoService } from '../../services/pedido.service';
import { PedidoConfirmacaoService } from '../../services/pedido-confirmacao.service';
import { PedidoResposta } from '../../models/pedido';

@Component({
  selector: 'app-area-cliente',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './area-cliente.html',
  styleUrl: './area-cliente.scss',
})
export class AreaCliente implements OnInit {
  readonly conta = inject(LoginManager);
  readonly pedido = inject(PedidoConfirmacaoService);
  private readonly pedidoService = inject(PedidoService);
  private readonly router = inject(Router);
  pedidos: PedidoResposta[] = [];
  carregandoPedidos = false;
  erroPedidos = '';

  sair(): void {
    this.conta.sair();
    void this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    if (!this.conta.token) return;
    this.carregandoPedidos = true;
    this.pedidoService.listarMeus().subscribe({
      next: pedidos => this.pedidos = pedidos,
      error: () => this.erroPedidos = 'N\u00e3o foi poss\u00edvel carregar seus pedidos.',
      complete: () => this.carregandoPedidos = false,
    });
  }
}