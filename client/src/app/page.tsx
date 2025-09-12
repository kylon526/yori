"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useAuth } from "@/components/context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [accessToken, router]);
}
