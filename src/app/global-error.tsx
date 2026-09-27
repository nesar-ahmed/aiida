"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#f7f5f0",
          color: "#12141f",
          textAlign: "center",
          padding: 16,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Something went wrong</h1>
        <p style={{ marginTop: 8, color: "#5b5b66" }}>
          Ocorreu um erro inesperado. Please try again.
        </p>
        {error.digest ? (
          <p style={{ marginTop: 8, fontSize: 12, color: "#9a9aa5" }}>
            {error.digest}
          </p>
        ) : null}
        <button
          onClick={reset}
          style={{
            marginTop: 24,
            padding: "10px 24px",
            borderRadius: 9999,
            border: "none",
            background: "#1f5c4d",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
