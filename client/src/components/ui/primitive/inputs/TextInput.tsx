"use client";

import { FormEvent, useState } from "react";
import styles from "./inputs.module.scss";

interface TextInputProps {
  id: string;
  initialValue?: string;
  label: string;
  placeholder?: string;
  onChange?: (e: string) => void;
}

export default function TextInput({
  id,
  initialValue = "",
  label,
  placeholder = "",
  onChange = () => {},
}: TextInputProps) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value;
    setValue(value);
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
