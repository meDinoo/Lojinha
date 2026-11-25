export interface LoginRequest {
  email: string;
  senha: string;
}

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
}

export interface RecuperarSenhaRequest {
  email: string;
}

export interface UsuarioConta {
  nome: string;
  email: string;
}

export interface LoginResposta {
  token: string;
  expiraEm: string;
  usuario: UsuarioConta;
}