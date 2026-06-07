"use client";

import { useState } from "react";
import { FormField, inputClass } from "@/components/FormField";

export function GatedAccessForm({ onSuccess }: { onSuccess?: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (process.env.NODE_ENV === "development") {
      console.log("[G1 gated access]", data);
    }
    setSubmitted(true);
    onSuccess?.();
  }

  if (submitted) {
    return (
      <p className="text-sm text-text-secondary">
        Request received. Our team will contact you within two business days.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField id="ga-name" label="Name" required>
        <input id="ga-name" name="name" required className={inputClass} />
      </FormField>
      <FormField id="ga-email" label="Work email" required>
        <input id="ga-email" name="email" type="email" required className={inputClass} />
      </FormField>
      <FormField id="ga-org" label="Organization" required>
        <input id="ga-org" name="organization" required className={inputClass} />
      </FormField>
      <FormField id="ga-role" label="Role" required>
        <input id="ga-role" name="role" required className={inputClass} />
      </FormField>
      <FormField id="ga-use" label="Intended use" required>
        <textarea id="ga-use" name="intendedUse" required rows={3} className={inputClass} />
      </FormField>
      <label className="flex items-start gap-2 text-sm text-text-secondary">
        <input type="checkbox" name="nda" required className="mt-1 accent-accent-blue focus-visible:ring-2 focus-visible:ring-accent-blue" />
        I agree to execute a mutual NDA before live preview access.
      </label>
      <button type="submit" className="signal-btn-primary w-full">
        Submit request
      </button>
    </form>
  );
}
