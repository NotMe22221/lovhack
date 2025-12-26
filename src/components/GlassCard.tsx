import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}

const GlassCard = ({ children, className, hover = true, style }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "relative rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-glass p-6 md:p-8",
        hover && "transition-all duration-300 hover:bg-white/70 hover:shadow-glass-hover hover:-translate-y-1",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassCard;
