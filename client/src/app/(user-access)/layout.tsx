"use client";
import { ResendProvider } from "@/components/context/ResendContext";
import Logo from "@/components/ui/logo/Logo";

export default function UserAccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "30% 1fr",
        alignItems: "center",
        justifyContent: "space-around",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Logo />
      <ResendProvider>
        <div style={{ alignSelf: "start" }}>{children}</div>
      </ResendProvider>
    </div>
  );
}
