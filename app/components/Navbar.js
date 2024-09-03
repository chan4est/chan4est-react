"use client";

import Image from "next/image";
import Link from "next/link";
import { Links } from "../lib/Links";
import { useState, useRef, useEffect } from "react";

const ICONS_PATH = "/header-icons";

function NavBarLink({ href, imgSrc, pText }) {
  return (
    <Link
      href={href}
      className="flex flex-row p-1 pr-2 pl-2 content-center gap-4 hover:underline"
    >
      <picture>
        <source
          srcSet={`${imgSrc}-w.webp`}
          media="(prefers-color-scheme: dark)"
        />
        <Image
          src={`${imgSrc}.webp`}
          height={25}
          width={25}
          alt=""
          quality={100}
          priority={true}
          loading={"eager"}
          unoptimized={true}
        />
      </picture>
      <p>{pText}</p>
    </Link>
  );
}

function NavBarAnchor({ href, imgSrc, pText, hasDarkMode }) {
  return (
    <a
      href={href}
      className="flex flex-row p-1 pr-2 pl-2 content-center gap-4 hover:underline"
    >
      <picture>
        {hasDarkMode && (
          <source
            srcSet={`${imgSrc}-w.webp`}
            media="(prefers-color-scheme: dark)"
          />
        )}
        <Image
          src={`${imgSrc}.webp`}
          height={25}
          width={25}
          alt=""
          quality={100}
          priority={true}
          loading={"eager"}
          unoptimized={true}
        />
      </picture>
      <p>{pText}</p>
    </a>
  );
}

export function NavBar({}) {
  // https://www.youtube.com/watch?v=HfZ7pdhS43s
  const [isMenuOpen, setisMenuOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setisMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <nav
      id="navbar"
      className="flex justify-center content-center flex-col pb-10"
      ref={menuRef}
      onClick={() => setisMenuOpen(!isMenuOpen)}
    >
      <button title="Menu">
        <div
          className="w-9 h-9 lg:w-11 lg:h-11 absolute top-3 right-3 z-50"
          title="Menu"
        >
          <picture>
            <source
              srcSet={"/header-icons/menu-w.webp"}
              media="(prefers-color-scheme: dark)"
            />
            <Image
              src={"/header-icons/menu.webp"}
              alt=""
              width={50}
              height={50}
              quality={50}
              className="p-2 rounded-lg hover:bg-accent hover:scale-110 transition duration-200 ease-in-out"
              priority={true}
              loading={"eager"}
            />
          </picture>
        </div>
      </button>
      {isMenuOpen && (
        <div className="absolute top-[60px] right-3 p-2 flex flex-col justify-center content-center bg-accent text-center drop-shadow-md z-50">
          <NavBarLink
            href={Links.HOME}
            imgSrc={"/header-icons/home"}
            pText={"Home"}
          />
          <NavBarLink
            href={Links.TECH_STACK}
            imgSrc={`${ICONS_PATH}/tech-stack`}
            pText={"Tech Stack"}
          />
          <NavBarLink
            href={Links.PROJECTS}
            imgSrc={`${ICONS_PATH}/projects`}
            pText={"Projects"}
          />
          <NavBarLink
            href={Links.RESUME}
            imgSrc={`${ICONS_PATH}/resume`}
            pText={"Resume"}
          />
          <NavBarLink
            href={Links.BLOG}
            imgSrc={`${ICONS_PATH}/blog`}
            pText={"Blog (WIP)"}
          />
          <NavBarAnchor
            href={Links.EMAIL}
            imgSrc={`${ICONS_PATH}/gmail`}
            pText={"Email"}
          />
          <NavBarAnchor
            href={Links.LINKEDIN}
            imgSrc={`${ICONS_PATH}/linkedin`}
            pText={"LinkedIn"}
          />
          <NavBarAnchor
            href={Links.GITHUB}
            imgSrc={`${ICONS_PATH}/github`}
            pText={"GitHub"}
            hasDarkMode={true}
          />
        </div>
      )}
    </nav>
  );
}
