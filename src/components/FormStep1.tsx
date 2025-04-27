
import { useState } from "react";
import { useForm } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const FormStep1 = () => {
  const { formData, updateFormData, nextStep } = useForm();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.produtoExplicacao.trim()) {
      setError("Por favor, explique seu produto para continuar.");
      return;
    }
    setError("");
    nextStep();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-gray-800">
          Explicação do Produto
        </h3>
        <p className="text-gray-600 mb-4">
          Descreva seu produto ou serviço em detalhes. O que ele faz? Como funciona?
        </p>
      </div>

      <div className="form-field">
        <Label htmlFor="produtoExplicacao">
          Explicação detalhada <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="produtoExplicacao"
          value={formData.produtoExplicacao}
          onChange={(e) => updateFormData("produtoExplicacao", e.target.value)}
          placeholder="Explique seu produto ou serviço em detalhes para que possamos gerar o melhor conteúdo..."
          className={`min-h-32 ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <Button onClick={handleNext} className="w-full">
        Próximo Passo
      </Button>
    </div>
  );
};
