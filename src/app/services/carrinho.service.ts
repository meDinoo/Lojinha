import { Injectable, computed, signal } from '@angular/core';
import { Produto } from '../models/produto';

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private readonly itensSignal = signal<ItemCarrinho[]>([]);
  readonly itens = this.itensSignal.asReadonly();
  readonly quantidade = computed(() => this.itensSignal().reduce((total, item) => total + item.quantidade, 0));
  readonly total = computed(() => this.itensSignal().reduce((valor, item) => valor + item.produto.preco * item.quantidade, 0));

  adicionar(produto: Produto): void {
    this.itensSignal.update((itens) => {
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
    this.itensSignal.update((itens) => itens.filter((item) => item.produto.id !== produtoId));
  }

  alterarQuantidade(produtoId: number, quantidade: number): void {
    if (quantidade < 1) {
      this.remover(produtoId);
      return;
    }
    this.itensSignal.update((itens) => itens.map((item) => item.produto.id === produtoId
      ? { ...item, quantidade }
      : item));
  }

  limpar(): void {
    this.itensSignal.set([]);
  }
}
