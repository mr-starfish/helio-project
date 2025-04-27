
import { createContext, useContext, useState, ReactNode } from 'react';
import { FormData, GeneratedContent } from '../types';
import { useToast } from "@/components/ui/use-toast";

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
  generatedContent: GeneratedContent[];
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
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 5;
  const { toast } = useToast();

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
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
      // URL do webhook do n8n - em um app real viria de uma variável de ambiente
      const webhookUrl = "https://n8n.ciatotech.com/webhook-test/get-guru";
      
      toast({
        title: "Enviando dados",
        description: "Estamos processando suas informações...",
      });

      // Enviar os dados para o webhook
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

      // Simular recebimento de conteúdo gerado (em um app real, teríamos uma resposta do n8n)
      // Aqui vamos esperar um pouco para simular o tempo de processamento do n8n
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dados simulados - no app real viriam do n8n
      const mockGeneratedContent: GeneratedContent[] = [
        {
          id: '1',
          title: 'Título para Publicação',
          content: `Você já enfrentou problemas com ${formData.principalProblema}? Nosso produto ${formData.produtoNome} foi desenvolvido especialmente para pessoas como você, que buscam uma solução efetiva. Conheça mais e transforme sua experiência!`,
          type: 'social',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Descrição para Landing Page',
          content: `${formData.produtoNome} é a solução que ${formData.avatarNome} estava procurando! Especialmente desenvolvido para resolver ${formData.principalProblema}, nosso produto oferece resultados comprovados. ${formData.produtoExplicacao}`,
          type: 'landing',
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'E-mail de Boas-vindas',
          content: `Olá ${formData.avatarNome}! Estamos felizes em tê-lo conosco. Sabemos que você enfrentou ${formData.principalProblema} e é por isso que criamos ${formData.produtoNome}. ${formData.produtoExplicacao} Estamos ansiosos para acompanhar sua jornada de sucesso!`,
          type: 'email',
          createdAt: new Date().toISOString(),
        }
      ];

      setGeneratedContent(mockGeneratedContent);
      
      toast({
        title: "Conteúdo gerado com sucesso!",
        description: "Seus textos personalizados estão prontos.",
      });
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
