"use client";

import { FormEvent } from "react";
import styles from "./inputs.module.scss";

interface EmailInputProps {
  id: string;
  label: string;
  placeholder?: string;
  onChange: (email: string) => void;
  required?: boolean;
  value: string;
}

export default function EmailInput({
  id,
  label,
  placeholder = "",
  onChange,
  required = false,
  value,
}: EmailInputProps) {
  function handleChange(event: FormEvent<HTMLInputElement>) {
    const email = (event.target as HTMLInputElement).value;
    onChange(email);
  }

  return (
    <label className={styles.label} htmlFor={id}>
      {label}

      <input
        type="email"
        className={styles.input}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}
