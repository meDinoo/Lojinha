import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginManager } from '../../managers/login-manager';
import { PedidoConfirmacaoService } from '../../services/pedido-confirmacao.service';

@Component({
  selector: 'app-area-cliente',
  imports: [RouterLink],
  templateUrl: './area-cliente.html',
  styleUrl: './area-cliente.scss',
})
export class AreaCliente {
  readonly conta = inject(LoginManager);
  readonly pedido = inject(PedidoConfirmacaoService);
}
