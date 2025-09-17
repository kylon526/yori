"use client";

import React, { useRef, useState } from "react";
import styles from "./ContactForm.module.scss";
import { useResend } from "@/components/context/ResendContext";
import Button from "@/components/ui/primitive/buttons/Button";
import EmailInput from "@/components/ui/primitive/inputs/EmailInput";
import TextInput from "@/components/ui/primitive/inputs/TextInput";
import TextareaInput from "@/components/ui/primitive/inputs/TextAreaInput";

export default function ContactForm() {
  const { isSending, error, success, resetResendContext, sendMessage } =
    useResend();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [message, setMessage] = useState("");

  const contactInfoContainerRef = useRef(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetResendContext();

    sendMessage(email, name, linkedIn, message).then(() => {
      setName("");
      setEmail("");
      setLinkedIn("");
      setMessage("");
    });
  };

  return (
    <div className={styles.contactContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.contactInfo} ref={contactInfoContainerRef}>
          <TextInput
            id="name"
            placeholder="Full Name"
            onChange={setName}
            label="Your Name"
            value={name}
          />
          <EmailInput
            id="email"
            label="Your Email"
            placeholder="your@email.com"
            required
            onChange={setEmail}
            value={email}
          />
          <TextInput
            id="linkedIn"
            label="Your LinkedIn Profile"
            placeholder="https://linkedin.com/in/..."
            onChange={setLinkedIn}
            value={linkedIn}
          />
        </div>
        <TextareaInput
          id="message"
          label="Your Message"
          onChange={setMessage}
          required
          placeholder="Type your message to Kylon here..."
          style={{ flexGrow: 1 }}
          value={message}
        />
        <div></div>
        <Button disabled={isSending || Boolean(error)}>
          {isSending ? "Sending..." : "Send Message"}
        </Button>
      </form>
      {success && <p className={styles.success}>Message sent successfully!</p>}
      {error && (
        <>
          <p className={styles.error}>Error: {error}.</p>
          <p>
            Please{" "}
            <a href="mailto:kylon526@gmail.com">reach out to Kylon directly</a>
          </p>
        </>
      )}
    </div>
  );
}
