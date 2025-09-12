"use client";

import styles from "./DashboardPage.module.scss"; // optional CSS module for styling
import Card from "@/components/ui/card/Card";

import RefreshAccessTokenIcon from "./portfolio/RefreshAccessTokenIcon";
import DashboardIcon from "./portfolio/DashboardIcon";
import AccessTokenIcon from "./portfolio/AccessTokenIcon";
import MFAIcon from "./portfolio/MFAIcon";
import LoadingIcon from "./portfolio/LoadingIcon";
import UserLoginIcon from "./portfolio/UserLoginIcon";
import Logo from "@/components/ui/logo/Logo";

export default function DashboardPage() {
  const steps = [
    {
      icon: AccessTokenIcon,
      label: "Initial Token Check",
      description:
        "When you first visit the site, the app checks if a valid access token exists. If no token is found, the user is redirected to the login page.",
    },
    {
      icon: UserLoginIcon,
      label: "Login / Token Refresh",
      description:
        "On the login page, your credentials are verified via the server. If an existing token is expired but refreshable, the app automatically retrieves a new token via a refresh token flow, preventing unnecessary logins.",
    },
    {
      icon: MFAIcon,
      label: "Multi-Factor Authentication (MFA)",
      description:
        "After login, you are prompted for a 6-digit MFA code sent to your registered email. The MFA page includes a resend code mechanism with a 60-second cooldown timer to prevent abuse. The system validates the code and updates the client-side auth state upon success.",
    },
    {
      icon: DashboardIcon,
      label: "Protected Dashboard Access",
      description:
        "Once authentication is complete, you are redirected to the dashboard. The dashboard renders only for authenticated users, ensuring sensitive content is protected.",
    },
    {
      icon: RefreshAccessTokenIcon,
      label: "Token Refresh",
      description:
        "Expired tokens are automatically refreshed via the refresh token flow, allowing seamless re-authentication without user intervention.",
    },
    {
      icon: LoadingIcon,
      label: "Global UX Enhancements",
      description:
        "While asynchronous operations occur (e.g., token refresh, MFA code resend), a full-screen loading indicator is displayed to provide a smooth user experience. This demonstrates advanced client-side state management with React contexts and Next.js App Router.",
    },
  ];

  return (
    <div className={styles.dashboard}>
      <Logo />
      <h1>Welcome to Kylon Tyner&apos;s portfolio project — Yori!</h1>
      <p>
        You have just completed a{" "}
        <strong>secure multi-step authentication process</strong> designed to
        protect your account and demonstrate robust front-end security
        practices.
      </p>

      <div className={styles.flowGrid}>
        {steps.map((step, index) => (
          <Card
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: "256px",
                height: "256px",
              }}
            >
              <step.icon />
            </div>
            <h2>{step.label}</h2>
            <p>{step.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
