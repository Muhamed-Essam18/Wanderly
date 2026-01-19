"use client";
import { useState } from "react";
import { TbWorld } from "react-icons/tb";
import { HiMenu, HiX } from "react-icons/hi";
import Backdrop from "../Backdrop/Backdrop";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navContent = (
    <ul className="flex flex-col md:flex-row font-medium md:text-text-primary gap-6 px-6 py-10 text-text-muted w-full md:w-auto md:text-xl ">
      <li className="hover:text-primary cursor-pointer transition text-xl">
        Home
      </li>
      <li className="hover:text-primary cursor-pointer transition text-xl">
        About
      </li>
      <li className="hover:text-primary cursor-pointer transition text-xl">
        My Wander
      </li>
    </ul>
  );

  return (
    <>
      {open && <Backdrop clicked={() => setOpen(!open)} />}
      <nav className="fixed  top-0 z-50 w-full bg-surface border-b border-white/10 block ">
        <div className={`flex flex-col justify-center h-20`}>
          <div className="w-[90%] h-16 flex flex-row justify-between m-auto ">
            <div className="flex flex-row justify-between gap-2 items-center">
              <TbWorld className="text-primary text-3xl" />
              <h1 className="text-text-primary text-2xl font-bold">Wanderly</h1>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-text-primary text-3xl"
            >
              {open ? <HiX /> : <HiMenu />}
            </button>
            <div className="hidden md:flex items-center">{navContent}</div>
          </div>
        </div>
        <div
          className={`md:hidden w-full bg-surface border-t border-white/10 duration-300 ease-out transition-all origin-top
            ${
              open
                ? "scale-y-100 opacity-100 max-h-screen"
                : "scale-y-0 opacity-0 max-h-0 "
            }
  `}
        >
          {navContent}
        </div>
      </nav>
    </>
  );
}
