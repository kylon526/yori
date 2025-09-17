"use client";

import { useAuth } from "@/components/context/AuthContext";
import Button from "@/components/ui/primitive/buttons/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./DashboardLayout.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import UserIcon from "@mui/icons-material/PersonSearch";
import LogoLeaf from "@/components/ui/logo/LogoLeaf";
import Avatar from "./about/kylon/Avatar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logOut } = useAuth();
  const router = useRouter();

  const links = [
    // {
    //   path: "/dashboard",
    //   text: "Home",
    //   icon: HomeIcon,
    // },
    {
      path: "/about/kylon",
      text: "Who is Kylon?",
      icon: UserIcon,
    },
    {
      path: "/about/yori",
      text: "What is Yori?",
      icon: LogoLeaf,
    },
  ];

  async function logout() {
    logOut().then(() => router.push("/"));
  }

  return (
    <>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <div className={styles.linksContainer}>
            {links &&
              links.map((link) => (
                <Link key={link.path} href={link.path} className={styles.link}>
                  <link.icon className={styles.linkIcon} />
                  {link.text}
                </Link>
              ))}
            {/* <Button onClick={logout}>Log Out</Button> */}
          </div>
        </nav>
        <div>
          <header className={styles.header}>
            <Avatar />
            <h1>Kylon Tyner</h1>
            <p>
              Senior Front-End Engineer | UI/UX Enthusiast | Clean Code Advocate
            </p>
          </header>
          <main>{children}</main>
          <footer className={styles.footer}>
            &copy; 2025 Kylon Tyner. All rights reserved.
          </footer>
        </div>
      </main>
    </>
  );
}
