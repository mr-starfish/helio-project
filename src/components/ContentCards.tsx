
import { useForm } from "@/contexts/FormContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCheck } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const ContentCards = () => {
  const { generatedContent, resetForm } = useForm();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    toast({
      title: "Conteúdo copiado!",
      description: "O texto foi copiado para sua área de transferência.",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Remove as tags HTML para copiar apenas o texto
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="w-full py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Seu conteúdo está pronto!</h2>
        <p className="text-gray-600 mb-8">
          Aqui está o texto personalizado para sua estratégia de marketing. 
          Você pode copiar e usá-lo imediatamente.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden animate-bounce-in bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-xl">Conteúdo Gerado</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: generatedContent.mensagem }}
            />
          </CardContent>
          <CardFooter className="flex justify-end pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(stripHtml(generatedContent.mensagem))}
              className="text-gray-600 hover:text-gray-900"
            >
              {copied ? (
                <CheckCheck className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <Copy className="mr-1 h-4 w-4" />
              )}
              {copied ? "Copiado!" : "Copiar"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10 flex justify-center">
        <Button onClick={resetForm}>Criar Novo Conteúdo</Button>
      </div>
    </div>
  );
};
