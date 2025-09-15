"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, CSSProperties } from "react";

interface SlideInOutProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  duration?: number;
}

export default function SlideInOut({
  children,
  className,
  style,
  duration = 0.4,
}: SlideInOutProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={pathname} // re-run animation when route changes
        layout
        initial={{ x: "50%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-50%", opacity: 0 }}
        transition={{ duration, ease: "easeInOut" }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
