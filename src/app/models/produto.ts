export interface Produto {
  id: number;
  nome: string;
  artista: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  destaque?: boolean;
}
