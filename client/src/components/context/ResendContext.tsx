"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Resend } from "resend";

// Define the shape of the context
interface ResendContextType {
  sendMfaCode: (email: string) => Promise<void>;
  isSending: boolean;
  error: string | null;
  success: boolean;
  resetResendContext: () => void;
}

// Create the context
const ResendContext = createContext<ResendContextType | undefined>(undefined);

interface ResendProviderProps {
  children: ReactNode;
}

// 🔑 Utility: Generate a random 6-digit code
const generateMfaCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const ResendProvider: React.FC<ResendProviderProps> = ({ children }) => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendMfaCode = async (email: string) => {
    resetResendContext();

    try {
      const newCode = generateMfaCode();

      await fetch("/api/mfa/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Yori MFA Code",
          code: newCode,
        }),
      }).catch((err) => {
        throw new Error(err || "Failed to send MFA code");
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSending(false);
    }
  };

  function resetResendContext() {
    setIsSending(false);
    setError(null);
    setSuccess(false);
  }

  return (
    <ResendContext.Provider
      value={{ sendMfaCode, isSending, error, success, resetResendContext }}
    >
      {children}
    </ResendContext.Provider>
  );
};

// Custom hook for consuming the provider
export const useResend = (): ResendContextType => {
  const context = useContext(ResendContext);
  if (!context) {
    throw new Error("useResend must be used within a ResendProvider");
  }
  return context;
};
