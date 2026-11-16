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
    {
      id: 5,
      nome: 'Clube da Esquina 2',
      artista: 'Milton Nascimento',
      descricao: 'Um encontro de vozes e harmonias que expandiu os caminhos da MPB.',
      preco: 119.9,
      categoria: 'MPB',
      destaque: true,
      imagem: '/imagens/discos/clube-da-esquina-2.svg',
    },
    {
      id: 6,
      nome: 'Transa',
      artista: 'Caetano Veloso',
      descricao: 'Cancoes de exilio e liberdade em um classico gravado em Londres.',
      preco: 109.9,
      categoria: 'MPB',
      imagem: '/imagens/discos/transa.svg',
    },
    {
      id: 7,
      nome: 'Acabou Chorare',
      artista: 'Novos Baianos',
      descricao: 'Samba, rock e poesia se encontram em um dos grandes discos do Brasil.',
      preco: 124.9,
      categoria: 'Tropicalia',
      destaque: true,
      imagem: '/imagens/discos/acabou-chorare.svg',
    },
    {
      id: 8,
      nome: 'Elis & Tom',
      artista: 'Elis Regina e Tom Jobim',
      descricao: 'A interpretacao intensa de Elis encontra os arranjos elegantes de Tom.',
      preco: 139.9,
      categoria: 'MPB',
      imagem: '/imagens/discos/elis-e-tom.svg',
    },
    {
      id: 9,
      nome: 'Da Lama ao Caos',
      artista: 'Nacao Zumbi',
      descricao: 'Maracatu e guitarras eletricas deram forma ao manguebeat.',
      preco: 114.9,
      categoria: 'Manguebeat',
      imagem: '/imagens/discos/da-lama-ao-caos.svg',
    },
    {
      id: 10,
      nome: 'Sobrevivendo no Inferno',
      artista: "Racionais MC's",
      descricao: 'Um marco do rap brasileiro, com relatos poderosos da vida na periferia.',
      preco: 129.9,
      categoria: 'Rap',
      destaque: true,
      imagem: '/imagens/discos/sobrevivendo-no-inferno.svg',
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
