"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <motion.div
      layout
      initial={{ x: "50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-50%", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>
      <button
        onClick={() => router.push("/register")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Register
      </button>
    </motion.div>
  );
}
