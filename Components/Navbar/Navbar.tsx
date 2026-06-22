"use client";
import { useState } from "react";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import Backdrop from "../Backdrop/Backdrop";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const path = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const { scrollY } = useScroll();
  const isActive = (id: string) => id === path;
  const nav = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const bg = useTransform(
    scrollY,
    [0, 200],
    ["rgba(0,0,0,0)", "rgba(12, 17, 31, 1)"]
  );
  const navContent = (
    <ul className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 text-sm md:text-base ">
      <li className="hover:text-primary">
        <Link
          onClick={() => setOpen(false)}
          className={`transition rounded-lg px-3 py-2 ${
            isActive("/")
              ? "bg-primary/20 text-primary"
              : "text-text-primary hover:text-primary"
          }`}
          href="/"
        >
          Home
        </Link>
      </li>
      <li className="hover:text-primary">
        <Link
          onClick={() => setOpen(false)}
          className={`transition rounded-lg px-3 py-2 ${
            isActive("/about")
              ? "bg-primary/20 text-primary"
              : "text-text-primary hover:text-primary"
          }`}
          href="/about"
        >
          About
        </Link>
      </li>
      <li className="hover:text-primary">
        <Link
          onClick={() => setOpen(false)}
          className={`transition rounded-lg px-3 py-2 ${
            isActive("/comming-soon")
              ? "bg-primary/20 text-primary"
              : "text-text-primary hover:text-primary"
          }`}
          href="/comming-soon"
        >
          Coming soon
        </Link>
      </li>
      <li className="hover:text-primary">
        <a
          onClick={() => setOpen(false)}
          className={`transition rounded-lg px-3 py-2 ${
            isActive("/contact")
              ? "bg-primary/20 text-primary"
              : "text-text-primary hover:text-primary"
          }`}
          href="https://essam-portfolio-nine.vercel.app/"
        >
          Contact
        </a>
      </li>
    </ul>
  );

  const authButtonsDesktop = isAuthenticated ? (
    <div className="hidden md:flex items-center gap-3 pl-6 border-l border-white/10">
      <span className="text-sm text-text-primary truncate max-w-[180px]">
        {user?.email}
      </span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm font-medium"
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="hidden md:flex items-center gap-3 pl-6 border-l border-white/10">
      <Link
        href="/auth/login"
        className="px-4 py-2 text-text-primary hover:text-primary transition text-sm font-medium"
      >
        Login
      </Link>
      <Link
        href="/auth/register"
        className="px-4 py-2  text-primary rounded-lg hover:bg-primary/30 transition text-sm font-medium"
      >
        Register
      </Link>
    </div>
  );

  const mobileAuthSection = isAuthenticated ? (
    <div className="border-t border-white/10 pt-6 mt-4 px-6 text-center pb-8">
      <div className="flex flex-col gap-3">
        <span className="text-sm text-text-primary break-words">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <div className="border-t border-white/10 pt-6 mt-4 px-6">
      <div className="flex flex-col gap-3">
        <Link
          href="/auth/login"
          className="px-4 py-2 text-text-primary hover:text-primary transition text-sm font-medium"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition text-sm font-medium text-center"
        >
          Register
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {open && (
        <motion.div>
          <Backdrop clicked={() => setOpen(!open)} />
        </motion.div>
      )}

      <motion.nav
        variants={nav}
        initial="hidden"
        animate="show"
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        style={{ backgroundColor: bg }}
        className="fixed  top-0 z-50 w-full "
      >
        <div className={`flex flex-col justify-center h-20`}>
          <div className="w-[90%] h-16 flex flex-row justify-between m-auto ">
            <div className="flex flex-row justify-between gap-2 items-center">
              <Link href="/">
                <Image
                  src="/imgs/logo1.png"
                  alt="logo"
                  width={120}
                  height={120}
                />
              </Link>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-text-primary text-3xl"
            >
              {open ? <HiX /> : <HiMenu />}
            </button>
            <div className="hidden md:flex items-center gap-6">
              {navContent}
              {authButtonsDesktop}
            </div>
          </div>
        </div>
        <motion.div
          className={`md:hidden w-full bg-surface border-t border-white/10 duration-300 ease-out transition-all origin-top overflow-hidden
            ${
              open
                ? "scale-y-100 opacity-100 max-h-screen"
                : "scale-y-0 opacity-0 max-h-0 "
            }
  `}
        >
          <div className="py-4">
            {navContent}
          </div>
          {mobileAuthSection}
        </motion.div>
      </motion.nav>
    </>
  );
}
