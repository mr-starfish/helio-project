
import { useAuth } from "@/contexts/AuthContext";
import { FormProvider } from "@/contexts/FormContext";
import Main from "./Main";
import Login from "./Login";
import { Loader } from "lucide-react";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <FormProvider>
          <Main />
        </FormProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Index;
