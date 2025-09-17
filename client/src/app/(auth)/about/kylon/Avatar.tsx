import Image from "next/image";
import styles from "./Avatar.module.scss";

export default function Avatar() {
  return (
    <div className={styles.avatarContainer}>
      <Image
        src="/kylon.jpg"
        alt="Kylon Tyner"
        width={500}
        height={500}
        className={styles.avatarImage}
      />
    </div>
  );
}
