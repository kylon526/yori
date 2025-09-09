import Image from "next/image";
import styles from "./page.module.css";
import ThemeToggle from "@/components/ui/theme-controls/ThemeToggle";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}></main>
    </div>
  );
}
