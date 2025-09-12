"use client";

import { motion } from "framer-motion";

export default function MotionSpinner() {
  return (
    <motion.svg width="40" height="40" viewBox="0 0 50 50" fill="none">
      <motion.circle
        cx="25"
        cy="25"
        r="20"
        stroke="var(--primary-a10-color)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />
    </motion.svg>
  );
}
