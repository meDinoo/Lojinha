export type FormaPagamento = 'pix' | 'cartao' | 'boleto';

export interface ItemPedidoRequest {
  produtoId: number;
  quantidade: number;
}

export interface EnderecoEntregaRequest {
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface CriarPedidoRequest {
  contato: { nome: string; email: string; telefone: string };
  enderecoEntrega: EnderecoEntregaRequest;
  formaPagamento: FormaPagamento;
  itens: ItemPedidoRequest[];
}

export interface ItemPedidoResposta {
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  total: number;
}

export interface PedidoResposta {
  id: string;
  data: string;
  status: string;
  itens: ItemPedidoResposta[];
  subtotal: number;
  frete: number;
  total: number;
}

export type ConfirmacaoPedido = PedidoResposta;