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
  generos: string[] = [];
  termo = '';
  generoSelecionado = '';

  ngOnInit(): void {
    this.generoSelecionado = localStorage.getItem('lojinha.genero') ?? '';
    this.produtoService.listar().subscribe((produtos) => {
      this.generos = [...new Set(produtos.map((produto) => produto.categoria))].sort((a, b) => a.localeCompare(b));
      if (this.generoSelecionado && !this.generos.includes(this.generoSelecionado)) {
        this.selecionarGenero('');
      }
    });
    this.route.queryParamMap.subscribe((params) => {
      this.termo = params.get('q')?.trim() ?? '';
      const busca = this.termo ? this.produtoService.pesquisar(this.termo) : this.produtoService.listar();
      busca.subscribe((produtos) => {
        this.produtos = produtos;
      });
    });
  }

  get produtosFiltrados(): Produto[] {
    return this.generoSelecionado
      ? this.produtos.filter((produto) => produto.categoria === this.generoSelecionado)
      : this.produtos;
  }

  selecionarGenero(genero: string): void {
    this.generoSelecionado = genero;
    if (genero) {
      localStorage.setItem('lojinha.genero', genero);
    } else {
      localStorage.removeItem('lojinha.genero');
    }
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinho.adicionar(produto);
    this.toast.mostrar(`${produto.nome} foi adicionado ao carrinho.`);
  }

  abrirProduto(produto: Produto): void {
    this.router.navigate(['/produto', produto.id]);
  }
}
