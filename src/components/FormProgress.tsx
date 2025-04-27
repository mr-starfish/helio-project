
import { useForm } from "@/contexts/FormContext";

export const FormProgress = () => {
  const { currentStep, totalSteps, goToStep } = useForm();
  
  const calculateProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  return (
    <div className="w-full mb-8">
      {/* Barra de Progresso */}
      <div className="form-progress-bar mb-4">
        <div 
          className="progress-indicator" 
          style={{ width: `${calculateProgress()}%` }}
        />
      </div>
      
      {/* Indicadores de Etapas */}
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <button
                onClick={() => goToStep(stepNumber)}
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all ${
                  isActive
                    ? "step-active animate-pulse-blue"
                    : isCompleted
                    ? "step-completed"
                    : "step-pending"
                }`}
              >
                {stepNumber}
              </button>
              <span className="text-xs text-gray-600">
                {stepNumber === 1 && "Explicação"}
                {stepNumber === 2 && "Nome"}
                {stepNumber === 3 && "Cliente"}
                {stepNumber === 4 && "Problema"}
                {stepNumber === 5 && "Avatar"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
