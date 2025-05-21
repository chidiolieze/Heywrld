import { cn } from "@/lib/utils";
import heywrldLogo from "../../assets/heywrld-logo.png";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function HeywrldLogo({ variant = "full", className, size = "md" }: LogoProps) {
  // Define the size for the full logo
  const sizesFullLogo = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
  };

  // Define the size for the icon only
  const sizesIconOnly = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  if (variant === "icon") {
    return (
      <div className={cn(sizesIconOnly[size], className)}>
        <img 
          src={heywrldLogo} 
          alt="Heywrld Enterprise Icon" 
          className="h-full w-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div className={cn(sizesFullLogo[size], className)}>
      <img 
        src={heywrldLogo} 
        alt="Heywrld Enterprise" 
        className="h-full w-auto object-contain"
      />
    </div>
  );
}
