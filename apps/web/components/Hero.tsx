import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";


export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden px-6 pt-36 pb-20 md:px-12 lg:px-32">
      <div className="holo-field absolute inset-0" aria-hidden="true" />
      <div className="holo-sweep" aria-hidden="true" />
      <div
        className="radial-glow"
        style={{ width: 800, height: 800, top: -200, right: -200 }}
        aria-hidden="true"
      />
      <div
        className="radial-glow"
        style={{
          width: 600,
          height: 600,
          bottom: -150,
          left: -100,
          background: "radial-gradient(circle, var(--color-glow-blue) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="holo-ring"
        style={{ width: 500, height: 500, top: -100, right: -150 }}
        aria-hidden="true"
      />
      <div
        className="holo-ring"
        style={{ width: 300, height: 300, bottom: -50, left: -80, animationDelay: "4s" }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-4xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 text-5xl font-extralight leading-[1.1] text-glow-sm md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-sm font-light text-text-secondary leading-relaxed">
          {subtitle}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {primaryCta && (
              <Link href={primaryCta.href} className="signal-btn-primary inline-block">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="signal-btn-secondary inline-block"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
        {children}
      </div>
    </header>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="relative overflow-hidden px-6 pt-36 pb-6 md:px-12 lg:px-32">
      <div className="holo-field absolute inset-0" aria-hidden="true" />
      <div className="holo-sweep" aria-hidden="true" />
      <div
        className="radial-glow"
        style={{ width: 600, height: 600, top: -150, right: -100 }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg-primary" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 text-4xl font-extralight text-glow-sm md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-sm font-light text-text-secondary leading-relaxed">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
