"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const GlobalError = ({ error, reset }: Readonly<GlobalErrorProps>) => (
  <html lang="ja">
    <body
      style={{
        alignItems: "center",
        display: "flex",
        fontFamily: "system-ui, sans-serif",
        justifyContent: "center",
        minHeight: "100dvh",
        padding: "1rem",
      }}
    >
      <div style={{ maxWidth: "32rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>エラーが発生しました</h1>
        <p style={{ marginTop: "0.5rem" }}>
          時間をおいて再度お試しください。
          {error.digest ? ` (${error.digest})` : ""}
        </p>
        <button type="button" onClick={reset} style={{ marginTop: "1rem" }}>
          再試行
        </button>
      </div>
    </body>
  </html>
);

export default GlobalError;
