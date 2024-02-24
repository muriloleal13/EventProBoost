export type Login = {
  email: string;
  senha: string;
};

export type EsqueciMinhaSenha = {
  email: string;
};

export type ResetarSenha = {
  token: string;
  novaSenha: string;
  confirmaSenha: string;
};

export type AtualizarToken = {
  token: string;
};
