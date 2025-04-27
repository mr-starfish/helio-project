
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary">
            <span className="text-accent">Conteúdo</span>Master
          </h1>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Olá, <span className="font-medium">{user.name || user.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Sair
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
