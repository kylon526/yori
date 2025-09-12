import { CSSProperties } from "react";
import styles from "./Card.module.scss";

interface CardProps {
  children: React.ReactNode;
  flexLayout?: boolean;
  style?: CSSProperties;
}

export default function Card({
  children,
  flexLayout = false,
  style,
}: CardProps) {
  return (
    <div
      className={`${styles.card} ${flexLayout ? styles.flex : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
