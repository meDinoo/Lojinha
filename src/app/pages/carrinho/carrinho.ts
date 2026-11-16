import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-carrinho',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {
  readonly carrinho = inject(CarrinhoService);
  private readonly toast = inject(ToastService);

  finalizarCompra(): void {
    this.carrinho.limpar();
    this.toast.mostrar('O sistema de pagamento está temporariamente indisponível. Seu carrinho foi esvaziado.');
  }
}
