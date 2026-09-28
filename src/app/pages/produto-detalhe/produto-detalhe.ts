import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-produto-detalhe',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './produto-detalhe.html',
  styleUrl: './produto-detalhe.scss',
})
export class ProdutoDetalhe implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly produtoService = inject(ProdutoService);
  readonly carrinho = inject(CarrinhoService);
  private readonly toast = inject(ToastService);
  produto?: Produto;
  adicionado = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produtoService.buscarPorId(id).subscribe((produto) => (this.produto = produto));
  }

  adicionarAoCarrinho(): void {
    if (!this.produto) return;
    this.carrinho.adicionar(this.produto);
    this.adicionado = true;
    this.toast.mostrar(`${this.produto.nome} foi adicionado ao carrinho.`);
  }

  voltar(): void {
    history.back();
  }
}
