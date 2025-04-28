
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthState, User } from '../types';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Função para gerar UUID no formato v4
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,
  });

  const { toast } = useToast();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Verificar se existe um token salvo no localStorage
        const token = localStorage.getItem('authToken');
        const userJson = localStorage.getItem('user');
        
        if (token && userJson) {
          const user = JSON.parse(userJson) as User;
          setAuthState({
            isAuthenticated: true,
            user,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: 'Falha ao verificar autenticação',
        });
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulação de login - em um app real, isso seria uma chamada de API
      // Validando campos
      if (!email || !password) {
        throw new Error('E-mail e senha são obrigatórios');
      }
      
      if (!email.includes('@') || password.length < 6) {
        throw new Error('E-mail ou senha inválidos');
      }

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados simulados - usando UUID válido para o ID do usuário
      const mockUser: User = {
        id: generateUUID(), // Gera um UUID v4 válido
        email: email,
        name: email.split('@')[0],
      };
      
      // Salvar token e usuário
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        isLoading: false,
        error: null,
      });
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Falha ao realizar login';
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: errorMessage,
      }));
      
      toast({
        title: "Erro de autenticação",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
