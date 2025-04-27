
import { useState } from "react";
import { useForm } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const FormStep3 = () => {
  const { formData, updateFormData, nextStep, prevStep } = useForm();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.clienteDescricao.trim()) {
      setError("Por favor, descreva seu cliente ideal para continuar.");
      return;
    }
    setError("");
    nextStep();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-gray-800">
          Descrição do Cliente Ideal
        </h3>
        <p className="text-gray-600 mb-4">
          Quem é seu cliente ideal? Descreva características demográficas, interesses, dores e necessidades.
        </p>
      </div>

      <div className="form-field">
        <Label htmlFor="clienteDescricao">
          Descrição detalhada <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="clienteDescricao"
          value={formData.clienteDescricao}
          onChange={(e) => updateFormData("clienteDescricao", e.target.value)}
          placeholder="Ex: Empreendedores entre 30-45 anos que buscam aumentar sua presença online mas não têm tempo para criar conteúdo..."
          className={`min-h-32 ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
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
