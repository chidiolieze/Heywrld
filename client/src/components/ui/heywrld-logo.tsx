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

  if (variant === "icon") {
    return (
      <div className={cn("rounded-full bg-primary flex items-center justify-center", sizeClasses[size], className)}>
        <svg viewBox="0 0 24 24" className="fill-secondary" width="70%" height="70%">
          <path d="M20.772 13.155l-3.236-6.486-1.79 3.57-1.792-3.57-3.237 6.486h2.688v2.688h4.689v-2.688h2.688zM8.155 9.074H4.08v2.688H1.394l3.236 6.486 1.79-3.57v-2.916h1.734V9.074z" />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("rounded-full bg-primary flex items-center justify-center", sizeClasses[size])}>
        <svg viewBox="0 0 24 24" className="fill-secondary" width="70%" height="70%">
          <path d="M20.772 13.155l-3.236-6.486-1.79 3.57-1.792-3.57-3.237 6.486h2.688v2.688h4.689v-2.688h2.688zM8.155 9.074H4.08v2.688H1.394l3.236 6.486 1.79-3.57v-2.916h1.734V9.074z" />
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
