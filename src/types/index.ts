export interface FormData {
  produtoExplicacao: string;
  produtoNome: string;
  clienteDescricao: string;
  principalProblema: string;
  avatarNome: string;
}

export interface User {
  email: string;
  id: string;
  name?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface GeneratedContent {
  mensagem: string;
}
