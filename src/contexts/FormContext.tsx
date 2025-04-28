
import { createContext, useContext, useState, ReactNode } from 'react';
import { FormData, GeneratedContent } from '../types';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface FormContextType {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  resetForm: () => void;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isSubmitting: boolean;
  submitForm: () => Promise<void>;
  generatedContent: GeneratedContent;
  isLoading: boolean;
}

const initialFormData: FormData = {
  produtoExplicacao: '',
  produtoNome: '',
  clienteDescricao: '',
  principalProblema: '',
  avatarNome: '',
};

const FormContext = createContext<FormContextType | null>(null);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm deve ser usado dentro de um FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({ mensagem: '' });
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 5;
  const { toast } = useToast();
  const { user } = useAuth();

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setGeneratedContent({ mensagem: '' });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setIsLoading(true);
    
    try {
      const webhookUrl = "https://n8n.ciatotech.com/webhook/get-guru";
      
      toast({
        title: "Enviando dados",
        description: "Estamos processando suas informações...",
      });

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar dados para processamento');
      }

      const data = await response.json();
      
      const truncatedContent = data.mensagem.substring(0, 1000000);
      setGeneratedContent({ mensagem: data.mensagem });

      // Usar diretamente o user do contexto Auth em vez de tentar obter novamente
      if (user) {
        const { error: historyError } = await supabase
          .from('content_history')
          .insert({
            user_id: user.id,
            product_name: formData.produtoNome,
            product_explanation: formData.produtoExplicacao,
            client_description: formData.clienteDescricao,
            main_problem: formData.principalProblema,
            avatar_name: formData.avatarNome,
            generated_content: truncatedContent
          });

        if (historyError) {
          console.error("Erro ao salvar histórico:", historyError);
          toast({
            title: "Aviso",
            description: "Conteúdo gerado com sucesso, mas houve um erro ao salvar no histórico.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Conteúdo gerado com sucesso!",
            description: "Seus textos personalizados estão prontos.",
          });
        }
      } else {
        toast({
          title: "Aviso",
          description: "Conteúdo gerado com sucesso, mas você precisa estar logado para salvar no histórico.",
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro ao processar sua solicitação';
      
      toast({
        title: "Erro no processamento",
        description: errorMessage,
        variant: "destructive",
      });
      
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        resetForm,
        currentStep,
        totalSteps,
        nextStep,
        prevStep,
        goToStep,
        isSubmitting,
        submitForm,
        generatedContent,
        isLoading,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
