import { useResend } from "@/components/context/ResendContext";
import { useUndo } from "@/components/context/UndoContext";
import { useState, useRef, useEffect } from "react";
import styles from "./mfa.module.scss";

interface MFAInputProps {
  onChange: () => void;
  onFinalInput: (code: string) => void;
}

export default function MFAInput({ onChange, onFinalInput }: MFAInputProps) {
  const [values, setValues] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const { execute } = useUndo();

  const handleChange = (index: number, value: string) => {
    const oldValues = values;

    const newValue = value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 1);
    const newValues = [...values];
    newValues[index] = newValue;

    if (oldValues) {
      execute({
        do: () => {
          setValues(newValues);

          if (newValue && index < 5) {
            inputsRef.current[index + 1]?.focus();
          }

          onChange();
        },
        undo: () => {
          setValues(oldValues ?? []);
          inputsRef.current[index]?.focus();
        },
      });
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    const newValues = Array(6).fill("");
    pasted.forEach((char, i) => (newValues[i] = char));
    setValues(newValues);

    const lastIndex = pasted.length - 1;
    if (lastIndex >= 0 && lastIndex < 6) {
      inputsRef.current[lastIndex]?.focus();
    }
  };

  useEffect(() => {
    if (values.every((val) => val !== "")) {
      const enteredCode = values.join("");
      onFinalInput(enteredCode);
    } else {
      setIsValid(null);
    }
  }, [values]);

  return (
    <div className={styles.inputContainer}>
      {values.map((val, i) => (
        <div key={i} className={styles.inputWrapper}>
          <input
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={styles.input}
          />
        </div>
      ))}
    </div>
  );
}
