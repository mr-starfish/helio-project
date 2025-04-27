
import { useState } from "react";
import { useForm } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const FormStep2 = () => {
  const { formData, updateFormData, nextStep, prevStep } = useForm();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.produtoNome.trim()) {
      setError("Por favor, informe o nome do produto para continuar.");
      return;
    }
    setError("");
    nextStep();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-gray-800">Nome do Produto</h3>
        <p className="text-gray-600 mb-4">
          Como se chama seu produto ou serviço? Este nome será usado em todo o conteúdo gerado.
        </p>
      </div>

      <div className="form-field">
        <Label htmlFor="produtoNome">
          Nome do produto <span className="text-red-500">*</span>
        </Label>
        <Input
          id="produtoNome"
          value={formData.produtoNome}
          onChange={(e) => updateFormData("produtoNome", e.target.value)}
          placeholder="Ex: MarketingPro, Solução X, Serviço Y"
          className={error ? "border-red-500 focus:ring-red-500" : ""}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={prevStep}
          className="w-1/2"
        >
          Voltar
        </Button>
        <Button onClick={handleNext} className="w-1/2">
          Próximo Passo
        </Button>
      </div>
    </div>
  );
};
