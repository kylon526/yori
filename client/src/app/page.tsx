"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { accessToken } = useAuth();

  useEffect(() => {
    router.push("/about/kylon");
    // if (!accessToken) {
    //   router.push("/login");
    // } else {
    //   router.push("/dashboard");
    // }
  }, [router]);
}
