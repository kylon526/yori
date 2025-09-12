"use client";

import { isTokenExpired } from "@/lib/auth/checkTokenExpiry";
import { refreshAccessToken } from "@/lib/auth/refreshToken";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContext {
  email: string;
  mfaValidated: boolean;
  accessToken: string;
  waitingOnToken: boolean;
  setEmail: (email: string) => void;
  setMfaValidated: (valid: boolean) => void;
  setAccessToken: (token: string) => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string>("");
  const [mfaValidated, setMfaValidated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [waitingOnToken, setWaitingOnToken] = useState<boolean>(false);

  useEffect(() => {
    if (!accessToken || isTokenExpired(accessToken)) {
      refreshAccessToken().then((newToken) => {
        if (newToken) setAccessToken(newToken);
      });
    }
  }, [accessToken]);

  async function refreshToken() {
    if (waitingOnToken || accessToken) return;

    setWaitingOnToken(true);
    const result = await fetch("/api/auth/refresh", { method: "POST" });

    if (result.ok) {
      const token = (await result.json()).accessToken;
      setAccessToken(token);
    }

    setWaitingOnToken(false);
  }

  return (
    <AuthContext.Provider
      value={{
        email,
        mfaValidated,
        accessToken,
        waitingOnToken,
        setEmail,
        setMfaValidated,
        setAccessToken,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
