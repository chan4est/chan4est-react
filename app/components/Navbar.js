"use client";

import Image from "next/image";
import Link from "next/link";
import { Links } from "../lib/Links";
import { useState, useRef, useEffect } from "react";

const ICONS_PATH = "/header-icons";

function NavBarItem({
  href,
  imgSrc,
  pText,
  useLink = false,
  hasDarkMode = false,
}) {
  // <Link> for pages local to site
  // <a>    for pages external to site
  const Wrapper = useLink ? Link : "a";

  return (
    <Wrapper
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
          height={50}
          width={50}
          alt=""
          quality={100}
          priority={true}
          loading={"eager"}
          unoptimized={true}
          className="h-6 w-6 lg:h-8 lg:w-8"
        />
      </picture>
      <p className="text-base lg:text-xl">{pText}</p>
    </Wrapper>
  );
}

export function NavBar({}) {
  // https://www.youtube.com/watch?v=HfZ7pdhS43s
  const [isMenuOpen, setisMenuOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef && !menuRef.current.contains(e.target)) {
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
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-13 lg:h-13 absolute top-3 right-3 z-50"
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
              width={100}
              height={100}
              quality={100}
              className="p-2 rounded-lg hover:bg-accent hover:scale-110 transition duration-200 ease-in-out"
              priority={true}
              loading={"eager"}
            />
          </picture>
        </div>
      </button>
      {isMenuOpen && (
        <div className="absolute top-[3.75rem] right-3 p-2 flex flex-col justify-center content-center bg-accent text-center drop-shadow-md z-50">
          <NavBarItem
            href={Links.HOME}
            imgSrc={"/header-icons/home"}
            pText={"Home"}
            useLink={true}
            hasDarkMode={true}
          />
          <NavBarItem
            href={Links.TECH_STACK}
            imgSrc={`${ICONS_PATH}/tech-stack`}
            pText={"Tech Stack"}
            useLink={true}
            hasDarkMode={true}
          />
          <NavBarItem
            href={Links.PROJECTS}
            imgSrc={`${ICONS_PATH}/projects`}
            pText={"Projects"}
            useLink={true}
            hasDarkMode={true}
          />
          <NavBarItem
            href={Links.RESUME}
            imgSrc={`${ICONS_PATH}/resume`}
            pText={"Resume"}
            useLink={true}
            hasDarkMode={true}
          />
          <NavBarItem
            href={Links.BLOG}
            imgSrc={`${ICONS_PATH}/blog`}
            pText={"Blog (WIP)"}
            useLink={true}
            hasDarkMode={true}
          />
          <NavBarItem
            href={Links.EMAIL}
            imgSrc={`${ICONS_PATH}/gmail`}
            pText={"Email"}
            useLink={false}
            hasDarkMode={false}
          />
          <NavBarItem
            href={Links.LINKEDIN}
            imgSrc={`${ICONS_PATH}/linkedin`}
            pText={"LinkedIn"}
            useLink={false}
            hasDarkMode={false}
          />
          <NavBarItem
            href={Links.GITHUB}
            imgSrc={`${ICONS_PATH}/github`}
            pText={"GitHub"}
            useLink={false}
            hasDarkMode={true}
          />
        </div>
      )}
    </nav>
  );
}
