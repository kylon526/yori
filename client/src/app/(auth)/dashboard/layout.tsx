"use client";

import { useAuth } from "@/components/context/AuthContext";
import Button from "@/components/ui/primitive/buttons/Button";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logOut } = useAuth();
  const router = useRouter();

  async function logout() {
    logOut().then(() => router.push("/"));
  }

  return (
    <main>
      <header>
        <Button onClick={logout}>Log Out</Button>
      </header>
      <main>{children}</main>
      <footer></footer>
    </main>
  );
}
