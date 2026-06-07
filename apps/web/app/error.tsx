"use client";

import { useEffect } from "react";

function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 md:px-12 lg:px-32">
      <div className="glass-panel p-8 max-w-md w-full text-center space-y-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-severity-critical">
          System fault detected
        </p>
        <h1 className="text-2xl font-extralight text-white">
          Something went wrong
        </h1>
        <p className="text-sm font-light text-text-secondary">
          An unexpected error occurred. The incident has been logged.
        </p>
        <button
          type="button"
          onClick={reset}
          className="signal-btn-primary inline-block text-sm mt-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
