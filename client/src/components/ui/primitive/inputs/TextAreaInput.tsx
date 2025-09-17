"use client";

import { CSSProperties, FormEvent, useState } from "react";
import styles from "./inputs.module.scss";

interface TextareaInputProps {
  id: string;
  initialValue?: string;
  label: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  rows?: number;
  style?: CSSProperties;
}

export default function TextareaInput({
  id,
  initialValue = "",
  label,
  placeholder = "",
  onChange = () => {},
  required = false,
  rows = 5,
  style = {},
}: TextareaInputProps) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event: FormEvent<HTMLTextAreaElement>) {
    const text = (event.target as HTMLTextAreaElement).value;
    setValue(text);
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
