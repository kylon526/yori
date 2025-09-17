"use client";

import { FormEvent } from "react";
import styles from "./inputs.module.scss";

interface TextInputProps {
  id: string;
  value: string;
  label: string;
  placeholder?: string;
  onChange?: (e: string) => void;
}

export default function TextInput({
  id,
  value,
  label,
  placeholder = "",
  onChange = () => {},
}: TextInputProps) {
  function handleChange(event: FormEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value;
    onChange(value);
  }

  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      <input
        className={styles.input}
        type="text"
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </label>
  );
}
