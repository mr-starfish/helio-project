
import { useForm } from "@/contexts/FormContext";
import { FormProgress } from "@/components/FormProgress";
import { FormStep1 } from "@/components/FormStep1";
import { FormStep2 } from "@/components/FormStep2";
import { FormStep3 } from "@/components/FormStep3";
import { FormStep4 } from "@/components/FormStep4";
import { FormStep5 } from "@/components/FormStep5";
import { ContentCards } from "@/components/ContentCards";
import { Header } from "@/components/Header";

const Main = () => {
  const { currentStep, generatedContent, isLoading } = useForm();

  // Renderiza o conteúdo com base na etapa atual
  const renderStep = () => {
    if (generatedContent.length > 0) {
      return <ContentCards />;
    }

    switch (currentStep) {
      case 1:
        return <FormStep1 />;
      case 2:
        return <FormStep2 />;
      case 3:
        return <FormStep3 />;
      case 4:
        return <FormStep4 />;
      case 5:
        return <FormStep5 />;
      default:
        return <FormStep1 />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!generatedContent.length && !isLoading && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Gerador de Conteúdo Personalizado
                </h1>
                <p className="text-gray-600">
                  Preencha o formulário abaixo para gerar conteúdos estratégicos para seu negócio.
                </p>
              </div>
              
              <FormProgress />
            </>
          )}
          
          {renderStep()}
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© 2025 ConteúdoMaster. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Main;
