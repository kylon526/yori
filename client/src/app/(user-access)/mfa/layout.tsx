import { UndoProvider } from "@/components/context/UndoContext";

export default function MfaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <UndoProvider>{children}</UndoProvider>;
}
