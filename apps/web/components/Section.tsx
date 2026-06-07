import { Eyebrow } from "@/components/Eyebrow";
import { cn } from "@/lib/cn";

export function Section({
  eyebrow,
  title,
  children,
  className,
  id,
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative px-6 py-20 md:px-12 lg:px-32", className)}>
      {/* Subtle connector line at section start */}
      {eyebrow && (
        <div
          className="connector-line connector-line-h absolute top-0 left-0 w-full"
          aria-hidden="true"
        />
      )}
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2 className="mt-4 text-2xl font-extralight text-glow-sm md:text-3xl">
          {title}
        </h2>
      )}
      <div className={eyebrow || title ? "mt-8" : undefined}>{children}</div>
    </section>
  );
}
