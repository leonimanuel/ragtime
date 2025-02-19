import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export function ProgressIndicator({ totalSteps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex gap-2 mb-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 rounded-full flex-1 transition-all duration-300",
            index <= currentStep ? "bg-primary" : "bg-muted"
          )}
        />
      ))}
    </div>
  );
} 