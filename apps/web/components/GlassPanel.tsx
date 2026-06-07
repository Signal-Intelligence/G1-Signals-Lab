import { cn } from "@/lib/cn";

export function GlassPanel({
  className,
  children,
  as: Tag = "div",
  accentBorder = "accent-blue",
  glowColor,
  hover = false,
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "article";
  accentBorder?: string | false;
  glowColor?: string;
  hover?: boolean;
}) {
  const borderClass = accentBorder ? `border-l-2` : "";
  const borderColorMap: Record<string, string> = {
    "accent-blue": "border-l-accent-blue",
    "severity-critical": "border-l-severity-critical",
    "severity-high": "border-l-severity-high",
    "accent-green": "border-l-accent-green",
    "severity-medium": "border-l-severity-medium",
  };
  const borderColor = accentBorder ? (borderColorMap[accentBorder] || "border-l-accent-blue") : "";
  const defaultGlow = glowColor ?? "var(--color-glow-blue)";

  return (
    <Tag
      className={cn(
        "glass-panel rounded-none overflow-hidden",
        borderClass,
        borderColor,
        hover && "hover:-translate-y-0.5 transition-all duration-300",
        className
      )}
    >
      <div
        className="radial-glow"
        style={{
          width: 280,
          height: 280,
          top: -70,
          right: -50,
          background: `radial-gradient(circle, ${defaultGlow} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}