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
      imagem: 'https://musicofmatthew.com/wp-content/uploads/2025/10/ab67616d0000b2730f18b9691fefc38827ffbd7a.jpg',
    },
    {
      id: 2,
      nome: 'Kind of Blue',
      artista: 'Miles Davis',
      descricao: 'Clássico do jazz e um dos álbuns mais influentes da história da música.',
      preco: 129.9,
      categoria: 'Jazz',
      destaque: true,
      imagem: 'https://quals.ua/image/cache/catalog/Covers/miles-davis-kind-of-blue-uhqr-45rpm-vinyl-2000x2000.jpeg',
    },
    {
      id: 3,
      nome: 'The Dark Side of the Moon',
      artista: 'Pink Floyd',
      descricao: 'Rock progressivo com uma experiência sonora marcante e atemporal.',
      preco: 149.9,
      categoria: 'Rock',
      imagem: 'https://www.covercentury.com/covers/audio/p/Pink_Floyd_-_Dark_Side_Of_The_Moon-front.jpg',
    },
    {
      id: 5,
      nome: 'Acabou Chorare',
      artista: 'Novos Baianos',
      descricao: 'Um disco brasileiro cheio de energia, mistura de samba, rock e alegria.',
      preco: 109.9,
      categoria: 'Brasileira',
      imagem: 'https://static.wixstatic.com/media/a7f161_bdb61c505b934b04be71c294590eef68~mv2.jpg/v1/fit/w_500%2Ch_500%2Cq_90/file.jpg',
    },
    {
      id: 7,
      nome: 'A Night at the Opera',
      artista: 'Queen',
      descricao: 'Rock clássico com grandes vocais e canções que marcaram gerações.',
      preco: 139.9,
      categoria: 'Rock',
      imagem: 'https://i.scdn.co/image/ab67616d0000b2737110a2b3dc32dc1224b7670f',
    },
    {
      id: 8,
      nome: 'Getz/Gilberto',
      artista: 'Stan Getz e João Gilberto',
      descricao: 'Um encontro marcante entre o jazz e a bossa nova.',
      preco: 119.9,
      categoria: 'Jazz',
      imagem: 'https://cdn.hmv.com/r/w-640/hmv/files/f2/f29366bf-88ec-4efa-b07f-0bd2d073968d.jpg',
    },
    {
      id: 9,
      nome: 'Tropicália ou Panis et Circencis',
      artista: 'Vários artistas',
      descricao: 'Álbum coletivo que representa a criatividade do movimento tropicalista.',
      preco: 94.9,
      categoria: 'MPB',
      imagem: 'https://s2.glbimg.com/eZ7PeD0fmzx1Tlju2cP8mG6r9HA%3D/1200x/smart/filters%3Acover%28%29%3Astrip_icc%28%29/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/N/5/vtbwGaT4S2GrGmRqSYEw/tropicalialp.jpg',
    },
    {
      id: 10,
      nome: 'The Rise and Fall of Ziggy Stardust',
      artista: 'David Bowie',
      descricao: 'Um clássico do glam rock com uma identidade visual e sonora única.',
      preco: 149.9,
      categoria: 'Rock',
      imagem: 'https://cdn11.bigcommerce.com/s-1xa2dhlu0a/images/stencil/500x659/products/91634/87471/LDB87376__00941.1657988485.jpg?c=1',
    },
    {
      id: 11,
      nome: 'Elis e Tom',
      artista: 'Elis Regina e Tom Jobim',
      descricao: 'Grandes interpretações da música brasileira em um encontro inesquecível.',
      preco: 124.9,
      categoria: 'MPB',
      imagem: 'https://cdn.awsli.com.br/2500x2500/769/769081/produto/99890549/21e5dc3ea5.jpg',
    },
    {
      id: 13,
      nome: 'Construção',
      artista: 'Chico Buarque',
      descricao: 'Um dos discos mais importantes da carreira de Chico Buarque.',
      preco: 104.9,
      categoria: 'MPB',
      imagem: 'https://www.jobim.org/chico/bitstream/handle/2010.2/1194/construcao.capa.jpg?sequence=2',
    },
    {
      id: 14,
      nome: 'Led Zeppelin IV',
      artista: 'Led Zeppelin',
      descricao: 'Rock pesado, folk e músicas marcantes em um álbum essencial.',
      preco: 144.9,
      categoria: 'Rock',
      imagem: 'https://media.rhino.com/sites/g/files/g2000012721/files/content/LZ%20IV%20Original%20Cover.jpg',
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
