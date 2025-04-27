
import { useForm } from "@/contexts/FormContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { Copy, CheckCheck } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const ContentCards = () => {
  const { generatedContent, resetForm } = useForm();
  const { toast } = useToast();
  const [copiedIds, setCopiedIds] = useState<string[]>([]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIds((prev) => [...prev, id]);
    
    toast({
      title: "Conteúdo copiado!",
      description: "O texto foi copiado para sua área de transferência.",
    });
    
    setTimeout(() => {
      setCopiedIds((prev) => prev.filter((itemId) => itemId !== id));
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: pt,
    });
  };

  const getCardBgColor = (type: string) => {
    switch (type) {
      case 'social':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50';
      case 'landing':
        return 'bg-gradient-to-br from-purple-50 to-pink-50';
      case 'email':
        return 'bg-gradient-to-br from-green-50 to-teal-50';
      default:
        return 'bg-gradient-to-br from-gray-50 to-slate-50';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'social':
        return 'Mídia Social';
      case 'landing':
        return 'Landing Page';
      case 'email':
        return 'E-mail';
      default:
        return 'Conteúdo';
    }
  };

  return (
    <div className="w-full py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Seu conteúdo está pronto!</h2>
        <p className="text-gray-600 mb-8">
          Aqui estão os textos personalizados para sua estratégia de marketing. 
          Você pode copiar e usá-los imediatamente.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {generatedContent.map((content) => (
          <Card key={content.id} className={`overflow-hidden animate-bounce-in ${getCardBgColor(content.type)}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{content.title}</CardTitle>
                  <CardDescription>
                    {getTypeLabel(content.type)} • {formatDate(content.createdAt)}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{content.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(content.content, content.id)}
                className="text-gray-600 hover:text-gray-900"
              >
                {copiedIds.includes(content.id) ? (
                  <CheckCheck className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="mr-1 h-4 w-4" />
                )}
                {copiedIds.includes(content.id) ? "Copiado!" : "Copiar"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button onClick={resetForm}>Criar Novo Conteúdo</Button>
      </div>
    </div>
  );
};
