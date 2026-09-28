import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { ToastService } from '../../services/toast.service';
import { CardDisco } from '../../components/card-disco/card-disco';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CardDisco],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly produtoService = inject(ProdutoService);
  private readonly router = inject(Router);
  readonly carrinho = inject(CarrinhoService);
  private readonly toast = inject(ToastService);
  produtos: Produto[] = [];

  ngOnInit(): void {
    this.produtoService.listar().subscribe((produtos) => (this.produtos = produtos));
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinho.adicionar(produto);
    this.toast.mostrar(`${produto.nome} foi adicionado ao carrinho.`);
  }

  abrirProduto(produto: Produto): void {
    this.router.navigate(['/produto', produto.id]);
  }
}
