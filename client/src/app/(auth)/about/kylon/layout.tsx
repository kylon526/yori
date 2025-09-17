import { ResendProvider } from "@/components/context/ResendContext";

export default function KylonPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ResendProvider>{children}</ResendProvider>;
}
