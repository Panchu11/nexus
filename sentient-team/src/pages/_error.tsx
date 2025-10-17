import React from "react";

type ErrorPageProps = {
  statusCode?: number;
};

function ErrorPage({ statusCode }: ErrorPageProps) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000", color: "#fff" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>{statusCode ? `${statusCode} Error` : "Application error"}</h1>
        <p style={{ opacity: 0.8 }}>A client-side exception has occurred. Check the browser console for more information.</p>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode } as ErrorPageProps;
};

export default ErrorPage;

