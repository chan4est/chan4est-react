"use client";

import Image from "next/image";
import Link from "next/link";
import { Links } from "../lib/Links";
import { useState, useRef, useEffect } from "react";

import navIconMenu from "../../public/header-icons/menu.webp";
import navIconMenuW from "../../public/header-icons/menu-w.webp";
import navIconX from "../../public/header-icons/x.webp";
import navIconXW from "../../public/header-icons/x-w.webp";
import navIconHome from "../../public/header-icons/home.webp";
import navIconHomeW from "../../public/header-icons/home-w.webp";
import navIconStack from "../../public/header-icons/tech-stack.webp";
import navIconStackW from "../../public/header-icons/tech-stack-w.webp";
import navIconProjects from "../../public/header-icons/projects.webp";
import navIconProjectsW from "../../public/header-icons/projects-w.webp";
import navIconResume from "../../public/header-icons/resume.webp";
import navIconResumeW from "../../public/header-icons/resume-w.webp";
import navIconBlog from "../../public/header-icons/blog.webp";
import navIconBlogW from "../../public/header-icons/blog-w.webp";
import navIconEmail from "../../public/header-icons/gmail.webp";
import navIconGithub from "../../public/header-icons/github.webp";
import navIconGithubW from "../../public/header-icons/github-w.webp";
import navIconLinkedIn from "../../public/header-icons/linkedin.webp";

function NavItem({
  href,
  imgSrc,
  imgSrcW,
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
          <source srcSet={imgSrcW.src} media="(prefers-color-scheme: dark)" />
        )}
        <Image
          src={imgSrc}
          alt=""
          quality={100}
          priority={true}
          loading={"eager"}
          unoptimized={true}
          className="h-6 w-6 sm:h-8 sm:w-8"
        />
      </picture>
      <p className="text-base sm:text-xl">{pText}</p>
    </Wrapper>
  );
}

export function NavDropdown({}) {
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
      // className="justify-center content-center flex-col h-11"
      ref={menuRef}
      onClick={() => setisMenuOpen(!isMenuOpen)}
    >
      <button
        title={isMenuOpen ? "Close" : "Menu"}
        className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-13 lg:h-13 absolute top-1 right-1 md:top-2 md:right-2 lg:top-3 lg:right-3 z-50"
      >
        <picture>
          <source
            srcSet={isMenuOpen ? navIconXW.src : navIconMenuW.src}
            media="(prefers-color-scheme: dark)"
          />
          <Image
            src={isMenuOpen ? navIconX : navIconMenu}
            alt=""
            quality={100}
            className="p-2 rounded-lg hover:scale-110 transition duration-200 ease-in-out"
            priority={true}
            loading={"eager"}
          />
        </picture>
      </button>
      {isMenuOpen && (
        <div className="absolute top-10 sm:top-12 md:top-14 lg:top-16 right-2 lg:right-3 p-2 flex flex-col justify-center content-center bg-accent text-center drop-shadow-md z-50 border-2 border-text rounded-xl">
          <NavItem
            href={Links.HOME}
            imgSrc={navIconHome}
            imgSrcW={navIconHomeW}
            pText={"Home"}
            useLink={true}
            hasDarkMode={true}
          />
          <NavItem
            href={Links.PROJECTS}
            imgSrc={navIconProjects}
            imgSrcW={navIconProjectsW}
            pText={"Projects"}
            useLink={true}
            hasDarkMode={true}
          />
          <NavItem
            href={Links.TECH_STACK}
            imgSrc={navIconStack}
            imgSrcW={navIconStackW}
            pText={"Tech Stack"}
            useLink={true}
            hasDarkMode={true}
          />
          <NavItem
            href={Links.RESUME}
            imgSrc={navIconResume}
            imgSrcW={navIconResumeW}
            pText={"Resume"}
            useLink={true}
            hasDarkMode={true}
          />
          <NavItem
            href={Links.BLOG}
            imgSrc={navIconBlog}
            imgSrcW={navIconBlogW}
            pText={"Blog (WIP)"}
            useLink={true}
            hasDarkMode={true}
          />
          <NavItem
            href={Links.EMAIL}
            imgSrc={navIconEmail}
            imgSrcW={navIconEmail}
            pText={"Email"}
            useLink={false}
            hasDarkMode={false}
          />
          <NavItem
            href={Links.LINKEDIN}
            imgSrc={navIconLinkedIn}
            imgSrcW={navIconLinkedIn}
            pText={"LinkedIn"}
            useLink={false}
            hasDarkMode={false}
          />
          <NavItem
            href={Links.GITHUB}
            imgSrc={navIconGithub}
            imgSrcW={navIconGithubW}
            pText={"GitHub"}
            useLink={false}
            hasDarkMode={true}
          />
        </div>
      )}
    </nav>
  );
}
