import { Injectable, computed, signal } from '@angular/core';
import { Produto } from '../models/produto';

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private readonly chaveArmazenamento = 'lojinha.carrinho';
  private readonly itensSignal = signal<ItemCarrinho[]>(this.carregarItens());
  readonly itens = this.itensSignal.asReadonly();
  readonly quantidade = computed(() => this.itensSignal().reduce((total, item) => total + item.quantidade, 0));
  readonly total = computed(() => this.itensSignal().reduce((valor, item) => valor + item.produto.preco * item.quantidade, 0));

  adicionar(produto: Produto): void {
    this.atualizarItens((itens) => {
      const existente = itens.find((item) => item.produto.id === produto.id);
      if (existente) {
        return itens.map((item) => item.produto.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item);
      }
      return [...itens, { produto, quantidade: 1 }];
    });
  }

  remover(produtoId: number): void {
    this.atualizarItens((itens) => itens.filter((item) => item.produto.id !== produtoId));
  }

  alterarQuantidade(produtoId: number, quantidade: number): void {
    if (quantidade < 1) {
      this.remover(produtoId);
      return;
    }
    this.atualizarItens((itens) => itens.map((item) => item.produto.id === produtoId
      ? { ...item, quantidade }
      : item));
  }

  limpar(): void {
    this.atualizarItens(() => []);
  }

  private atualizarItens(atualizar: (itens: ItemCarrinho[]) => ItemCarrinho[]): void {
    const itens = atualizar(this.itensSignal());
    this.salvarItens(itens);
    this.itensSignal.set(itens);
  }

  private carregarItens(): ItemCarrinho[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const armazenado = localStorage.getItem(this.chaveArmazenamento);
    if (!armazenado) {
      return [];
    }

    const itens: unknown = JSON.parse(armazenado);
    if (!Array.isArray(itens) || !itens.every(this.ehItemCarrinho)) {
      throw new Error('Os dados salvos no carrinho são inválidos.');
    }

    return itens;
  }

  private salvarItens(itens: ItemCarrinho[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.chaveArmazenamento, JSON.stringify(itens));
    }
  }

  private ehItemCarrinho(item: unknown): item is ItemCarrinho {
    if (!item || typeof item !== 'object' || !('produto' in item) || !('quantidade' in item)) {
      return false;
    }

    const produto = item.produto;
    return typeof item.quantidade === 'number'
      && Number.isInteger(item.quantidade)
      && item.quantidade > 0
      && !!produto
      && typeof produto === 'object'
      && 'id' in produto
      && typeof produto.id === 'number'
      && 'nome' in produto
      && typeof produto.nome === 'string'
      && 'artista' in produto
      && typeof produto.artista === 'string'
      && 'descricao' in produto
      && typeof produto.descricao === 'string'
      && 'preco' in produto
      && typeof produto.preco === 'number'
      && 'imagem' in produto
      && typeof produto.imagem === 'string'
      && 'categoria' in produto
      && typeof produto.categoria === 'string';
  }
}
