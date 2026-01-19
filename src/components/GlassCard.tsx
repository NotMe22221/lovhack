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
        "relative rounded-3xl bg-black/50 backdrop-blur-2xl border border-black/40 shadow-glass p-6 md:p-8",
        hover && "transition-all duration-500 ease-out hover:bg-black/60 hover:shadow-glass-hover",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassCard;
