"use client";
import { useState } from "react";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import Backdrop from "../Backdrop/Backdrop";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  const { scrollY } = useScroll();
  const path = usePathname();
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
    <ul className="flex flex-col md:flex-row font-medium  gap-6 px-6 py-10  w-full md:w-auto md:text-xl text-center overflow-hidden">
      <li id="home" className={`hover:text-primary cursor-pointer`}>
        <Link
          className={`hover:text-primary cursor-pointer transition text-[15px] ${
            isActive("/")
              ? "bg-primary/20 text-primary rounded-lg px-3 py-2 "
              : "text-text-primary"
          }`}
          href="/"
        >
          Home
        </Link>
      </li>
      <li id="/about" className={`hover:text-primary cursor-pointer`}>
        <Link
          className={`hover:text-primary cursor-pointer transition text-[15px] ${
            isActive("/about")
              ? "bg-primary/20 text-primary rounded-lg px-3 py-2 "
              : "text-text-primary"
          }`}
          href="/about"
        >
          About
        </Link>
      </li>
      <li id="comming-soon" className={`hover:text-primary cursor-pointer`}>
        <Link
          className={`hover:text-primary cursor-pointer transition text-[15px] ${
            isActive("/comming-soon")
              ? "bg-primary/20 text-primary rounded-lg px-3 py-2  "
              : "text-text-primary"
          }`}
          href="/comming-soon"
        >
          Comming soon
        </Link>
      </li>
      <li id="contact" className={`hover:text-primary cursor-pointer`}>
        <Link
          className={`hover:text-primary cursor-pointer transition text-[15px] ${
            isActive("/contact")
              ? "bg-primary/20 text-primary rounded-lg px-3 py-2   "
              : "text-text-primary"
          }`}
          href="Contat"
        >
          Contact
        </Link>
      </li>
    </ul>
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
            <div className="hidden md:flex items-center overflow-hidden">
              {navContent}
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
          {navContent}
        </motion.div>
      </motion.nav>
    </>
  );
}
