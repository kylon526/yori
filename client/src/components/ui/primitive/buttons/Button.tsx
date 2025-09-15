import { FormEvent } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  inline?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

type ButtonType = "primary" | "secondary" | "danger";

export default function Button({
  onClick = () => {},
  primary = false,
  secondary = false,
  danger = false,
  inline = false,
  disabled = false,
  children,
  className = "",
}: ButtonProps) {
  if ((primary && secondary) || (primary && danger) || (secondary && danger)) {
    throw new Error("Buttons should only use one type.");
  }

  let variant: ButtonType = "primary";

  if (secondary) {
    variant = "secondary";
  } else if (danger) {
    variant = "danger";
  } else {
    variant = "primary";
  }

  return (
    <button
      onClick={onClick}
      className={`${className} ${styles.button} ${styles[variant]} ${
        inline ? styles.inline : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
