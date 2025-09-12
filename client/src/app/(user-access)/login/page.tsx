"use client";

import { useAuth } from "@/components/context/AuthContext";
import { useResend } from "@/components/context/ResendContext";
import Card from "@/components/ui/card/Card";
import MotionSpinner from "@/components/ui/loading/MotionSpinner";
import Button from "@/components/ui/primitive/buttons/Button";
import EmailInput from "@/components/ui/primitive/inputs/EmailInput";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [sendError, setSendError] = useState<Error>();

  const router = useRouter();
  const { isSending, error, sendMfaCode, success, resetResendContext } =
    useResend();
  const { accessToken, email, waitingOnToken, setEmail, refreshToken } =
    useAuth();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    if (!isSending) {
      sendMfaCode(email);
    }
  }

  useEffect(() => {
    if (accessToken) {
      router.push("/dashboard");
    } else {
      refreshToken();
    }
  }, [accessToken, router, refreshToken]);

  useEffect(() => {
    if (isSending) return;

    if (success) {
      router.push("/mfa");
      resetResendContext();
      return;
    }

    if (error) {
      setLoading(false);
      setSendError(new Error(error));
    }
  }, [success, error, isSending, router, resetResendContext]);

  return (
    <>
      <motion.div
        key="login-page"
        layout
        initial={{ x: "50%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-50%", opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card flexLayout>
          <h1>Login</h1>
          {(loading || waitingOnToken) && <MotionSpinner />}
          {!loading && !waitingOnToken && (
            <>
              <form onSubmit={handleLogin}>
                {sendError && (
                  <div style={{ color: "red" }}>{sendError.message}</div>
                )}
                <EmailInput
                  label="Email"
                  id="email"
                  onChange={setEmail}
                  required
                />
                <Button>Continue With Email</Button>
              </form>
              <span>
                Don&apos;t have an account? <a href="/register">Register</a>
              </span>
            </>
          )}
        </Card>
      </motion.div>
    </>
  );
}
