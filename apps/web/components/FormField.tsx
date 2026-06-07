export function FormField({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs uppercase tracking-[var(--tracking-label)] text-text-secondary">
        {label}
        {required && <span className="text-accent-blue"> *</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-xs text-accent-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  "w-full border border-border-default bg-bg-tertiary px-3 py-2 text-sm text-text-primary hover:border-border-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary";
