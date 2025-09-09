import SlideInOut from "@/components/ui/animation/SlideInOut";
import { AnimatePresence } from "framer-motion";

export default function UserAccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AnimatePresence mode="wait">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {children}
      </div>
    </AnimatePresence>
  );
}
