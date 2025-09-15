"use client";

import Card from "@/components/ui/card/Card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./mfa.module.scss";
import MFAInput from "./MFAInput";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import MotionSpinner from "@/components/ui/loading/MotionSpinner";
import { useResend } from "@/components/context/ResendContext";
import Button from "@/components/ui/primitive/buttons/Button";

export default function MFAPage() {
  const [isValid, setValidity] = useState<boolean | null>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [busy, setBusy] = useState<boolean>();
  const [resendTimer, setResendTimer] = useState<number>(0);

  const router = useRouter();
  const { email, setAccessToken } = useAuth();
  const { sendMfaCode } = useResend();

  function onChange() {
    setValidity(null);
    setErrorMessage("");
  }

  async function submitMFA(code: string) {
    setBusy(true);
    const response = await fetch("/api/mfa/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        email,
      }),
    });

    if (response.ok) {
      const accessToken = ((await response.json()) as { accessToken: string })
        .accessToken;
      setAccessToken(accessToken);
      router.push("/dashboard");
    } else {
      setBusy(false);
    }
  }

  async function resendMfaCode() {
    if (resendTimer > 0) return; // prevent clicking while cooling down

    try {
      await sendMfaCode(email);
      setResendTimer(60); // start 60s cooldown
    } catch (err) {
      console.error("Failed to resend MFA code", err);
      setErrorMessage("Could not resend code. Please try again.");
    }
  }

  // Countdown effect
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <motion.div
      key="mfa-page"
      layout
      initial={{ x: "50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-50%", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Card flexLayout>
        {busy && <MotionSpinner />}
        {!busy && (
          <>
            <h1>Enter your 6-digit MFA code</h1>
            <p>We sent a 6-digit code to your inbox.</p>
            <MFAInput onChange={onChange} onFinalInput={submitMFA} />
            <span>
              Didn&apos;t get an email?{" "}
              <Button inline onClick={resendMfaCode} disabled={resendTimer > 0}>
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
              </Button>
            </span>

            {isValid === true && (
              <p className={styles.success}>✅ Code is valid</p>
            )}
            {isValid === false && (
              <p className={styles.error}>❌ {errorMessage}</p>
            )}
          </>
        )}
      </Card>
    </motion.div>
  );
}
