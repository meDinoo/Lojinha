import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly produtos: Produto[] = [
    {
      id: 1,
      nome: 'Clube da Esquina',
      artista: 'Milton Nascimento e Lô Borges',
      descricao: 'Um dos discos mais importantes da música brasileira, com uma mistura marcante de MPB, rock e música mineira.',
      preco: 99.9,
      categoria: 'MPB',
      destaque: true,
      imagem: '/imagens/discos/clube-da-esquina.svg',
    },
    {
      id: 2,
      nome: 'Kind of Blue',
      artista: 'Miles Davis',
      descricao: 'Clássico do jazz e um dos álbuns mais influentes da história da música.',
      preco: 129.9,
      categoria: 'Jazz',
      destaque: true,
      imagem: '/imagens/discos/kind-of-blue.svg',
    },
    {
      id: 3,
      nome: 'The Dark Side of the Moon',
      artista: 'Pink Floyd',
      descricao: 'Rock progressivo com uma experiência sonora marcante e atemporal.',
      preco: 149.9,
      categoria: 'Rock',
      imagem: '/imagens/discos/dark-side.svg',
    },
    {
      id: 4,
      nome: 'Toquinho e Vinicius',
      artista: 'Toquinho e Vinicius de Moraes',
      descricao: 'Uma seleção especial de canções brasileiras para ouvir com calma.',
      preco: 89.9,
      categoria: 'Brasileira',
      imagem: '/imagens/discos/toquinho-vinicius.svg',
    },
  ];

  listar(): Observable<Produto[]> {
    return of(this.produtos);
  }

  buscarPorId(id: number): Observable<Produto | undefined> {
    return of(this.produtos.find((produto) => produto.id === id));
  }

  pesquisar(termo: string): Observable<Produto[]> {
    const busca = termo.trim().toLowerCase();
    return of(this.produtos.filter((produto) =>
      `${produto.nome} ${produto.artista} ${produto.categoria}`.toLowerCase().includes(busca),
    ));
  }
}
