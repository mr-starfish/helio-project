
import { useState } from "react";
import { useForm } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

export const FormStep5 = () => {
  const { formData, updateFormData, prevStep, submitForm, isSubmitting } = useForm();
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!formData.avatarNome.trim()) {
      setError("Por favor, informe o nome do avatar para continuar.");
      return;
    }
    setError("");
    await submitForm();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-gray-800">Nome do Avatar</h3>
        <p className="text-gray-600 mb-4">
          Dê um nome ao seu cliente ideal. Isso nos ajudará a personalizar ainda mais o conteúdo.
        </p>
      </div>

      <div className="form-field">
        <Label htmlFor="avatarNome">
          Nome do avatar <span className="text-red-500">*</span>
        </Label>
        <Input
          id="avatarNome"
          value={formData.avatarNome}
          onChange={(e) => updateFormData("avatarNome", e.target.value)}
          placeholder="Ex: João, Maria, Empresário Carlos..."
          className={error ? "border-red-500 focus:ring-red-500" : ""}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={prevStep}
          className="w-1/2"
          disabled={isSubmitting}
        >
          Voltar
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="w-1/2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader className="mr-2 h-4 w-4 animate-spin" /> Enviando...
            </span>
          ) : (
            "Gerar Conteúdo"
          )}
        </Button>
      </div>

      <div className="text-center mt-6 text-sm text-gray-600">
        <p>
          "Vamos criar algo incrível! Preencha as informações e veja o resultado em poucos segundos."
        </p>
      </div>
    </div>
  );
};
