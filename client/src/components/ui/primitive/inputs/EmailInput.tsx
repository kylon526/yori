"use client";

import { FormEvent, useState } from "react";
import styles from "./inputs.module.scss";

interface EmailInputProps {
  id: string;
  initialValue?: string;
  label: string;
  placeholder?: string;
  onChange: (email: string) => void;
  required?: boolean;
}

export default function EmailInput({
  id,
  initialValue = "",
  label,
  placeholder = "",
  onChange,
  required = false,
}: EmailInputProps) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const email = (event.target as HTMLInputElement).value;
    onChange(email);
    setValue(email);
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
