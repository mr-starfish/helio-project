
import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-violet-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              <span className="text-accent">Conteúdo</span>
              <span className="text-primary">Master</span>
            </h1>
            <p className="text-gray-600">
              Sua plataforma para geração de conteúdos estratégicos
            </p>
          </div>

          <LoginForm />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© 2025 ConteúdoMaster. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Login;
