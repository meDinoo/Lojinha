import { CarrinhoService } from './carrinho.service';
import { Produto } from '../models/produto';

describe('CarrinhoService', () => {
  const chaveArmazenamento = 'lojinha.carrinho';
  const produto: Produto = {
    id: 1,
    nome: 'Clube da Esquina',
    artista: 'Milton Nascimento e Lô Borges',
    descricao: 'Um clássico da música brasileira.',
    preco: 99.9,
    imagem: '/imagens/discos/clube-da-esquina.svg',
    categoria: 'MPB',
  };

  beforeEach(() => localStorage.removeItem(chaveArmazenamento));
  afterEach(() => localStorage.removeItem(chaveArmazenamento));

  it('restores the cart from local storage and persists quantity changes', () => {
    const carrinho = new CarrinhoService();
    carrinho.adicionar(produto);
    carrinho.alterarQuantidade(produto.id, 3);

    const restaurado = new CarrinhoService();

    expect(restaurado.quantidade()).toBe(3);
    expect(restaurado.total()).toBeCloseTo(299.7);

    restaurado.limpar();
    expect(localStorage.getItem(chaveArmazenamento)).toBe('[]');
  });
});
