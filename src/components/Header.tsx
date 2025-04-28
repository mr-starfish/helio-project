
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-xl font-bold">
            ConteúdoMaster
          </Link>
          {user && (
            <Link to="/history" className="text-gray-600 hover:text-gray-900">
              Histórico
            </Link>
          )}
        </div>
        <div>
          {user ? (
            <Button variant="ghost" onClick={signOut}>
              Sair
            </Button>
          ) : (
            <Link to="/login">
              <Button>Entrar</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
