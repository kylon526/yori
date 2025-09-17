"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/about/kylon");
    // if (!accessToken) {
    //   router.push("/login");
    // } else {
    //   router.push("/dashboard");
    // }
  }, [router]);
}
