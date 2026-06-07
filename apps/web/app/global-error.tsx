"use client";

function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0a0f", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", maxWidth: 400, padding: 32 }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#c4506a" }}>
              Critical fault
            </p>
            <h1 style={{ fontSize: 24, fontWeight: 200, margin: "16px 0" }}>Application Error</h1>
            <p style={{ fontSize: 14, fontWeight: 300, color: "#9ca3af" }}>
              A critical error occurred. Please try again.
            </p>
            <button
              type="button"
              onClick={reset}
              onMouseOver={(e) => { e.currentTarget.style.background = "#1a75ff"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "#0066ff"; }}
              onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 2px #0a0a0f, 0 0 0 4px #0066ff"; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              style={{ marginTop: 24, padding: "8px 24px", background: "#0066ff", color: "#fff", border: "none", cursor: "pointer", fontSize: 14, transition: "background 0.2s, box-shadow 0.2s" }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

export default GlobalError;
