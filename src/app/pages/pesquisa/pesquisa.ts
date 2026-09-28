import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { ToastService } from '../../services/toast.service';
import { CardDisco } from '../../components/card-disco/card-disco';

@Component({
  selector: 'app-pesquisa',
  imports: [RouterLink, CardDisco],
  templateUrl: './pesquisa.html',
  styleUrl: './pesquisa.scss',
})
export class Pesquisa implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly produtoService = inject(ProdutoService);
  private readonly carrinho = inject(CarrinhoService);
  private readonly toast = inject(ToastService);

  produtos: Produto[] = [];
  termo = '';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.termo = params.get('q')?.trim() ?? '';
      const busca = this.termo ? this.produtoService.pesquisar(this.termo) : this.produtoService.listar();
      busca.subscribe((produtos) => (this.produtos = produtos));
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinho.adicionar(produto);
    this.toast.mostrar(`${produto.nome} foi adicionado ao carrinho.`);
  }

  abrirProduto(produto: Produto): void {
    this.router.navigate(['/produto', produto.id]);
  }
}
