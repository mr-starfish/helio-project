
import { useState } from "react";
import { useForm } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const FormStep4 = () => {
  const { formData, updateFormData, nextStep, prevStep } = useForm();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.principalProblema.trim()) {
      setError("Por favor, informe o principal problema para continuar.");
      return;
    }
    setError("");
    nextStep();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-gray-800">
          Principal Problema
        </h3>
        <p className="text-gray-600 mb-4">
          Qual é o principal problema que seu produto ou serviço resolve?
        </p>
      </div>

      <div className="form-field">
        <Label htmlFor="principalProblema">
          Principal problema <span className="text-red-500">*</span>
        </Label>
        <Input
          id="principalProblema"
          value={formData.principalProblema}
          onChange={(e) => updateFormData("principalProblema", e.target.value)}
          placeholder="Ex: falta de tempo para criar conteúdo, dificuldade em gerar leads..."
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
