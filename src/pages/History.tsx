
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

interface HistoryItem {
  id: string;
  product_name: string;
  generated_content: string;
  created_at: string;
}

export const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('content_history')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setHistory(data || []);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar o histórico.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Histórico de Conteúdos Gerados</h1>
        <Button onClick={() => navigate('/')}>Gerar Novo Conteúdo</Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Carregando histórico...</div>
      ) : history.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Nenhum conteúdo gerado ainda.</p>
          <Button className="mt-4" onClick={() => navigate('/')}>
            Gerar Primeiro Conteúdo
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {history.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.product_name}</CardTitle>
                <div className="text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString('pt-BR')}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: item.generated_content }} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
