"use client";

import Link from "next/link";
import styles from "./DashboardLayout.module.scss";
import UserIcon from "@mui/icons-material/PersonSearch";
import LogoLeaf from "@/components/ui/logo/LogoLeaf";
import Avatar from "./about/kylon/Avatar";
import HamburgerMenuToggle from "@/components/ui/navigation/HamburgerMenuToggle";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // const { logOut } = useAuth();
  // const router = useRouter();

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

  // async function logout() {
  //   logOut().then(() => router.push("/"));
  // }

  function handleMenuToggle() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <>
      <div
        className={`${styles.layoutContainer} ${menuOpen ? styles.menuOpen : ""}`}
      >
        <HamburgerMenuToggle
          onToggle={handleMenuToggle}
          className={styles.hamburgerMenu}
          open={menuOpen}
        />
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <div className={styles.linksContainer}>
            {links &&
              links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={styles.link}
                  onClick={handleMenuToggle}
                >
                  <link.icon className={styles.linkIcon} />
                  {link.text}
                </Link>
              ))}
            {/* <Button onClick={logout}>Log Out</Button> */}
          </div>
        </nav>
        <div
          className={`${styles.contentContainer} ${menuOpen ? styles.menuOpen : ""}`}
        >
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
      </div>
    </>
  );
}
