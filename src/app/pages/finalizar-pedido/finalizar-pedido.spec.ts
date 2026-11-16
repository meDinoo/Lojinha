import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FinalizarPedido } from './finalizar-pedido';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from '../../models/produto';
import { PedidoConfirmacaoService } from '../../services/pedido-confirmacao.service';

describe('FinalizarPedido', () => {
  let component: FinalizarPedido;
  let fixture: ComponentFixture<FinalizarPedido>;
  let carrinho: CarrinhoService;

  const produto: Produto = {
    id: 2,
    nome: 'Kind of Blue',
    artista: 'Miles Davis',
    descricao: 'Um clássico do jazz.',
    preco: 129.9,
    imagem: '/imagens/discos/kind-of-blue.svg',
    categoria: 'Jazz',
  };

  beforeEach(async () => {
    localStorage.removeItem('lojinha.carrinho');
    await TestBed.configureTestingModule({
      imports: [FinalizarPedido],
      providers: [provideRouter([])],
    }).compileComponents();

    carrinho = TestBed.inject(CarrinhoService);
    carrinho.adicionar(produto);
    fixture = TestBed.createComponent(FinalizarPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.removeItem('lojinha.carrinho'));

  it('does not confirm an incomplete order', () => {
    component.finalizarPedido();

    expect(component.enviado).toBeFalse();
    expect(component.pedidoPreparado).toBeNull();
  });

  it('rejects invalid CEP and telephone values', () => {
    component.form.patchValue({
      nome: 'Cliente',
      email: 'cliente@example.com',
      telefone: '123',
      cep: '123',
      endereco: 'Rua de teste',
      numero: '10',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      pagamento: 'pix',
    });

    component.finalizarPedido();

    expect(component.form.controls.telefone.hasError('pattern')).toBeTrue();
    expect(component.form.controls.cep.hasError('pattern')).toBeTrue();
    expect(component.pedidoPreparado).toBeNull();
  });

  it('shows a demo-only confirmation without clearing the cart or storing personal data', () => {
    component.form.patchValue({
      nome: 'Cliente de teste',
      email: 'cliente@example.com',
      telefone: '11999999999',
      cep: '01000000',
      endereco: 'Rua de teste',
      numero: '10',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      pagamento: 'pix',
    });

    component.finalizarPedido();
    fixture.detectChanges();

    expect(component.enviado).toBeTrue();
    expect(component.pedidoPreparado).toEqual({
      contato: {
        nome: 'Cliente de teste',
        email: 'cliente@example.com',
        telefone: '11999999999',
      },
      enderecoEntrega: {
        cep: '01000000',
        endereco: 'Rua de teste',
        numero: '10',
        complemento: '',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
      },
      formaPagamento: 'pix',
      itens: [{ produtoId: produto.id, quantidade: 1 }],
    });
    expect(carrinho.itens().length).toBe(1);
    expect(TestBed.inject(PedidoConfirmacaoService).ultimoPedidoConfirmado()).toBeNull();
    expect(localStorage.getItem('lojinha.carrinho')).not.toContain('cliente@example.com');
    expect(fixture.nativeElement.textContent).toContain('Nenhum pedido foi enviado ou cobrado');
  });
});
