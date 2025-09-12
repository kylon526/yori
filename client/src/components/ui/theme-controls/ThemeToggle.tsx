"use client";

import classes from "./ThemeToggle.module.scss";
import { useTheme } from "@/components/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        bottom: "0.5rem",
        right: "0.5rem",
      }}
    >
      <button
        className={`${classes.toggleSwitch} ${theme}`}
        onClick={toggleTheme}
      >
        <span className={classes.moon}>🌙</span>
        <span className={classes.sun}>☀️</span>
        <div
          className={`${classes.knob} ${theme === "dark" ? classes.dark : ""}`}
        ></div>
      </button>
      <span className={classes.labelText}>
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </span>
    </div>
  );
}
