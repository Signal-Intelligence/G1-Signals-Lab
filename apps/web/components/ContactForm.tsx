"use client";

import { useState } from "react";
import { FormField, inputClass } from "@/components/FormField";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";

const interests = ["Demo", "Partnership", "Investment", "Press", "Other"] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (process.env.NODE_ENV === "development") {
      console.log("[G1 contact]", data);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <GlassPanel className="p-5" accentBorder="accent-green" glowColor="var(--color-glow-green)">
        <CardHeader label="RECEIVED" dotColor="bg-accent-green" />
        <p className="text-sm font-light text-text-secondary leading-relaxed">
          Thank you. We will respond within two business days.
        </p>
        <CardFooter />
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="p-5">
      <CardHeader label="CONTACT FORM" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField id="c-name" label="Name" required>
          <input id="c-name" name="name" required className={inputClass} />
        </FormField>
        <FormField id="c-email" label="Work email" required>
          <input id="c-email" name="email" type="email" required className={inputClass} />
        </FormField>
        <FormField id="c-org" label="Organization" required>
          <input id="c-org" name="organization" required className={inputClass} />
        </FormField>
        <FormField id="c-role" label="Role" required>
          <input id="c-role" name="role" required className={inputClass} />
        </FormField>
        <fieldset>
          <legend className="mb-2 text-[11px] uppercase tracking-[var(--tracking-label)] text-text-secondary">
            Primary interest *
          </legend>
          <div className="space-y-2">
            {interests.map((i) => (
              <label key={i} className="flex items-center gap-2 text-[11px] text-text-secondary">
                <input type="radio" name="interest" value={i} required className="accent-accent-blue focus-visible:ring-2 focus-visible:ring-accent-blue" />
                {i}
              </label>
            ))}
          </div>
        </fieldset>
        <FormField id="c-message" label="Message">
          <textarea id="c-message" name="message" rows={4} className={inputClass} />
        </FormField>
        <button type="submit" className="signal-btn-primary w-full">
          Submit
        </button>
      </form>
      <CardFooter />
    </GlassPanel>
  );
}
