import * as React from "react";

interface MFATemplateProps {
  code: string;
}

export function MFATemplate({ code }: MFATemplateProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Yori MFA Code</h1>
      {code &&
        code.split("").map((digit, index) => (
          <span
            key={index}
            style={{
              backgroundColor: "#aaa",
              color: "#000",
              fontSize: "64px",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
          >
            {digit}
          </span>
        ))}
    </div>
  );
}
