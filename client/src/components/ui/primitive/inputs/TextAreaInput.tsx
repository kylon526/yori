"use client";

import { CSSProperties, FormEvent } from "react";
import styles from "./inputs.module.scss";

interface TextareaInputProps {
  id: string;
  label: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  rows?: number;
  style?: CSSProperties;
  value: string;
}

export default function TextareaInput({
  id,
  label,
  placeholder = "",
  onChange = () => {},
  required = false,
  rows = 5,
  style = {},
  value,
}: TextareaInputProps) {
  function handleChange(event: FormEvent<HTMLTextAreaElement>) {
    const text = (event.target as HTMLTextAreaElement).value;
    onChange(text);
  }

  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      <textarea
        id={id}
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        style={style}
      />
    </label>
  );
}
