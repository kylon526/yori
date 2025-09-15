"use client";

import { refreshAccessToken } from "@/lib/auth/refreshToken";
import { createContext, useContext, useState } from "react";

interface AuthContext {
  email: string;
  accessToken: string;
  waitingOnToken: boolean;
  setEmail: (email: string) => void;
  setAccessToken: (token: string) => void;
  refreshToken: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [waitingOnToken, setWaitingOnToken] = useState<boolean>(false);

  async function refreshToken() {
    if (waitingOnToken) return;

    setWaitingOnToken(true);
    const newToken = await refreshAccessToken();

    if (newToken) {
      setAccessToken(newToken);
    }

    setWaitingOnToken(false);
  }

  async function logOut() {
    setAccessToken("");
    await fetch("/api/auth/logout", { method: "POST" });
  }

  return (
    <AuthContext.Provider
      value={{
        email,
        accessToken,
        waitingOnToken,
        setEmail,
        setAccessToken,
        refreshToken,
        logOut,
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
