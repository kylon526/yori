"use client";

import styles from "./YoriPage.module.scss";
import Logo from "@/components/ui/logo/Logo";
import Chat from "@/components/chat/Chat";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <Logo />
      <motion.h1
        initial={{ x: "-50%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "50%", opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
      >
        Welcome to Kylon Tyner&apos;s portfolio project
      </motion.h1>
      <Chat />
    </div>
  );
}
