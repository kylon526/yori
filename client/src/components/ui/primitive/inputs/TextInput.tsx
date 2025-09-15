"use client";

import { useState } from "react";
import styles from "./inputs.module.scss";

interface TextInputProps {
  id: string;
  initialValue?: string;
  label: string;
  placeholder?: string;
}

export default function TextInput({
  id,
  initialValue = "",
  label,
  placeholder = "",
}: TextInputProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      <input
        className={styles.input}
        type="text"
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
