"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <motion.div
      layout
      initial={{ x: "50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-50%", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <h1>Register Page</h1>
      <button onClick={() => router.push("/login")}>Go to Login</button>
    </motion.div>
  );
}
