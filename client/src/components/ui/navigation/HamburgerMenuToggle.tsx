import { CSSProperties } from "react";
import styles from "./HamburgerMenuToggle.module.scss";

interface HamburgerMenuToggleProps {
  style?: CSSProperties;
  className?: string;
  onToggle?: () => void;
  open?: boolean;
}

export default function HamburgerMenuToggle({
  style = {},
  className = "",
  onToggle = () => {},
  open = false,
}: HamburgerMenuToggleProps) {
  function handleClick() {
    onToggle();
  }

  return (
    <div
      className={`${styles.toggleContainer} ${open ? styles.open : ""} ${className}`}
      style={style}
      onClick={handleClick}
    >
      <div className={styles.toggle}></div>
    </div>
  );
}
