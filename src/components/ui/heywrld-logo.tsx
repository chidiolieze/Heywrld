import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function HeywrldLogo({ variant = "full", className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: variant === "full" ? "h-6" : "h-6 w-6",
    md: variant === "full" ? "h-8" : "h-8 w-8",
    lg: variant === "full" ? "h-12" : "h-12 w-12",
  };

  // Heywrld icon component based on the provided image
  if (variant === "icon") {
    return (
      <div className={cn("text-lime-400", sizeClasses[size], className)}>
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="50" fill="currentColor" />
          <path d="M32 40H18v15H10l18 25 10-20V45h10V30H32z M90 40L72 15l-10 20-10-20L34 40h15v15h26V40z" 
            fill="#004225" 
          />
        </svg>
      </div>
    );
  }

  // Full logo with text
  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("text-lime-400", sizeClasses[size])}>
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="50" fill="currentColor" />
          <path d="M32 40H18v15H10l18 25 10-20V45h10V30H32z M90 40L72 15l-10 20-10-20L34 40h15v15h26V40z" 
            fill="#004225"
          />
        </svg>
      </div>
      <div className="ml-2 flex flex-col">
        <span className={cn("font-bold text-foreground", 
          size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl")}>
          Heywrld
        </span>
        <span className={cn("text-primary", 
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base")}>
          enterprise
        </span>
      </div>
    </div>
  );
}
