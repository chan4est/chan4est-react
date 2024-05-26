"use client";

import Image from "next/image";
import chanPhoto from "../public/me.webp";
import Link from "next/link";
import { techIconsData } from "./lib/techIconsData.js";
import { techStack } from "./lib/techStack.js";
import { projectsList } from "./lib/projects.js";
import { useState, useRef, useEffect } from "react";

function StackIcon({
  stackImg,
  stackImgAlt,
  stackText,
  stackLink,
  scale,
  hasDarkMode,
}) {
  let imageClass = "w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14";
  let spanClass = "text-xs min-[550px]:text-base min-h-[41px]";
  if (scale == 0.5) {
    imageClass = "w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7";
    spanClass = "text-xs min-[550px]:text-xs min-h-[41px]";
  }
  return (
    <a
      href={stackLink}
      className="flex flex-col justify-center items-center text-center hover:scale-110 transition duration-200 ease-in-out"
    >
      {/* https://stackoverflow.com/questions/71313889/how-can-i-present-a-different-next-image-based-on-the-users-preferred-color-sch */}
      <picture className={imageClass}>
        {hasDarkMode && (
          <source
            srcSet={`/tech-icons/${stackImg}-w.webp`}
            media="(prefers-color-scheme: dark)"
          />
        )}
        <Image
          src={`/tech-icons/${stackImg}.webp`}
          alt={stackImgAlt}
          width={100}
          height={100}
          quality={100}
        />
      </picture>
      <span className={spanClass}>{stackText}</span>
    </a>
  );
}

function AboutSection({}) {
  return (
    <section id="intro" className="flex flex-col max-w-screen-md pb-10">
      <div
        id="picAndInfo"
        className="flex flex-col md:flex-row items-center justify-center"
      >
        {/* <Link
          href="/blog"
          className="hover:scale-105 transition duration-200 ease-in-out"
        > */}
        <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0">
          <Image
            src={chanPhoto}
            alt="Chandler at the Pokemon Cafe in Tokyo, Japan"
            className="rounded-xl"
            quality={100}
          />
        </div>
        {/* </Link> */}
        <div className="flex flex-col items-center justify-center pt-5 md:pl-7">
          <ul className="">
            <li>
              <b>Name:</b> Chandler Forrest
            </li>
            <li>
              <b>Location:</b> California (GMT -07:00)
            </li>
            <li>
              <b>Years of Experience:</b> 5 Years
            </li>
            <li>
              <b>Credentials:</b> B.S. Computer Science
            </li>
            <li>
              <b>School:</b> UC Santa Barbara
            </li>
            <li>
              <b>Favorite Languages:</b> Python, JavaScript, Java
            </li>
          </ul>
        </div>
      </div>
      <p className="pt-5 ">
        I&apos;m a full-stack software engineer who&apos;s built a variety of
        software ranging from high throughput/low latency APIs, highly scaleable
        data pipelines, fully automated testing frameworks, to beautiful
        user-driven websites, and easy-to-use mobile applications.
      </p>
      <p className="pt-5">
        What makes me most fullfilled as an engineer is seeing an idea go from a
        proof of concept to a fully featured production-ready application!
      </p>
      <p className="pt-5">
        When I&apos;m not working, I&apos;m usually attending a{" "}
        <a
          href="https://docs.google.com/spreadsheets/d/1JjRG0ecEKX-PcujPT5zeRwYcGetAocj5kE3DGuULYkQ/edit?usp=sharing"
          className="underline"
        >
          concert/music festival
        </a>
        ,{" "}
        <a href="https://howlongtobeat.com/user/chan4est" className="underline">
          playing video games
        </a>
        , or{" "}
        <Link href="/blog/" className="underline">
          traveling abroad
        </Link>
        !
      </p>
      <p className="pt-5">
        Please drop me a line if you&apos;re interested in working together!
      </p>

      <div
        id="contact"
        className="flex flex-row items-center justify-center gap-5 pt-5"
      >
        <a
          href="mailto:chan4est@gmail.com?subject=I Found Your Website!"
          className="hover:scale-125 transition duration-200 ease-in-out"
          title="Email me"
        >
          <Image
            src={`/tech-icons/gmail.webp`}
            height={35}
            width={35}
            alt="Gmail Logo"
            quality={100}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/chan4est/"
          className="hover:scale-125 transition duration-200 ease-in-out"
          title="Connect with me on LinkedIn"
        >
          <Image
            src={`/tech-icons/linkedin.webp`}
            height={35}
            width={35}
            alt="LinkedIn Logo"
            quality={100}
          />
        </a>
        <a
          href="https://github.com/chan4est/"
          className="hover:scale-125 transition duration-200 ease-in-out"
          title="View my GitHub"
        >
          <picture>
            {/* <source
              srcSet={`/tech-icons/github-w.webp`}
              media="(prefers-color-scheme: dark)"
            /> */}
            <Image
              src={`/tech-icons/github.webp`}
              height={35}
              width={35}
              alt="GitHub Logo"
              quality={100}
            />
          </picture>
        </a>
      </div>
    </section>
  );
}

function generateStackIconList(techIconsArr, scale = 1) {
  // Add components to hash table to maintain the order descripted in the JSON
  let techHash = new Object();
  techIconsData.forEach((item) => {
    techHash[item.img] = (
      <StackIcon
        key={item.img}
        stackImg={`${item.img}`}
        stackImgAlt={`${item.name} Logo`}
        stackText={item.name}
        stackLink={item.link}
        scale={scale}
        hasDarkMode={item.darkMode2}
      />
    );
  });
  // Building the actual list. In order of the JSON.
  let techRowElements = [];
  techIconsArr.forEach((item) => {
    techRowElements.push(techHash[item]);
  });
  return techRowElements;
}

function TechStackSection({}) {
  const languageList = generateStackIconList(techStack.languages);
  const frameworkList = generateStackIconList(techStack.frameworks);
  const databaseList = generateStackIconList(techStack.databases);
  const infrastructureList = generateStackIconList(techStack.infrastructure);
  const toolsList = generateStackIconList(techStack.tools);
  const programsList = generateStackIconList(techStack.programs);

  return (
    <section id="tech-stack" className="max-w-screen-md">
      <div
        className="flex flex-row justify-center items-center pt-5"
        id="techstack-header"
      >
        <Link href="/#tech-stack">
          <h3 className="pr-3">Tech Stack</h3>
        </Link>
        <div className="w-7 h-7">
          <picture>
            <source
              srcSet={`/header-icons/tech-stack-w.webp`}
              media="(prefers-color-scheme: dark)"
            />
            <Image
              src={"/header-icons/tech-stack.webp"}
              alt="Tech Stack Vector Logo"
              width={50}
              height={50}
              quality={100}
            />
          </picture>
        </div>
      </div>
      <p className="pb-2 pt-2">
        These are the technologies I&apos;ve used during my professional career
        and would feel confident working with daily.
      </p>
      <div className="flex justify-center content-center flex-col pb-10">
        <h5 className="">Languages</h5>
        <div className="grid grid-cols-6 grid-rows-1 gap-x-5 pt-3">
          {languageList}
        </div>
        <h5 className="">Frameworks</h5>
        <div className="grid grid-cols-6 grid-rows-1 gap-x-5 pt-3">
          {frameworkList}
        </div>
        <h5 className="">Databases</h5>
        <div className="grid grid-cols-4 grid-rows-1 gap-x-5 pt-3">
          {databaseList}
        </div>
        <h5 className="">Infrastructure</h5>
        <div className="grid grid-cols-6 grid-rows-1 gap-x-5 pt-3">
          {infrastructureList}
        </div>
        <h5 className="">Programs</h5>
        <div className="grid grid-cols-5 grid-rows-1 gap-x-5 pt-3">
          {programsList}
        </div>
        <h5 className="">Tools</h5>
        <div className="grid grid-cols-6 grid-rows-1 gap-x-5 pt-3">
          {toolsList}
        </div>
      </div>
    </section>
  );
}

function Project({ projectInfo }) {
  let languageList = generateStackIconList(projectInfo.languages, 0.5);
  return (
    <div>
      <h5 className="pt-2 pb-2">{projectInfo.name}</h5>
      <div className=" bg-accent rounded-xl drop-shadow-md hover:scale-105 transition duration-200 ease-in-out">
        <a href={projectInfo.link}>
          <div>
            <Image
              src={`/projects/${projectInfo.img}`}
              alt={`${projectInfo.name} Twitter Image`}
              width={600}
              height={315}
              className="rounded-t-xl"
              quality={100}
            />
          </div>
          <div className="p-2">
            <p className="text-xs text-text-500">
              {projectInfo.displayLink.toUpperCase()}
            </p>
            <p className="text-sm font-bold line-clamp-1">
              {projectInfo.title}
            </p>
            <p className="text-sm text-text-500 line-clamp-2 sm:min-h-[41px] 2xl:min-h-0 2xl:line-clamp-1">
              {projectInfo.description}
            </p>
          </div>
        </a>
      </div>
      <h5 className="pt-3">Tech Used</h5>
      <div className={`grid grid-cols-7 grid-rows-1 gap-x-5 pt-1`}>
        {languageList}
      </div>
    </div>
  );
}

function ProjectsSection({}) {
  let projects = [];
  projectsList.forEach((item) => {
    projects.push(<Project projectInfo={item} key={item.name} />);
  });
  return (
    <section id="projects" className="max-w-screen-2xl pb-10">
      <div
        className="flex flex-row justify-center items-center pt-5"
        id="projects-header"
      >
        <Link href="/#projects">
          <h3 className="pr-3">Projects</h3>
        </Link>
        <div className="w-7 h-7">
          <picture>
            <source
              srcSet={"/header-icons/projects-w.webp"}
              media="(prefers-color-scheme: dark)"
            />
            <Image
              src={"/header-icons/projects.webp"}
              alt="Tech Stack Vector Logo"
              width={50}
              height={50}
              quality={100}
            />
          </picture>
        </div>
      </div>

      <div className="flex justify-center content-center flex-col pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {projects}
        </div>
      </div>
    </section>
  );
}

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
          alt={`${pText} Vector Logo`}
          quality={100}
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
          alt={`${pText} Vector Logo`}
          quality={100}
        />
      </picture>
      <p>{pText}</p>
    </a>
  );
}

function NavBar({}) {
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
      <button>
        <div
          className="w-9 h-9 sm:w-11 sm:h-11 absolute top-3 right-3"
          title="Menu"
        >
          <picture>
            <source
              srcSet={"/header-icons/menu-w.webp"}
              media="(prefers-color-scheme: dark)"
            />
            <Image
              src={"/header-icons/menu.webp"}
              alt="Menu Vector Logo"
              width={50}
              height={50}
              quality={100}
              className="p-2 rounded-lg hover:bg-accent hover:scale-110 transition duration-200 ease-in-out"
            />
          </picture>
        </div>
      </button>
      {isMenuOpen && (
        <div className="absolute top-[60px] right-3 p-2 flex flex-col justify-center content-center bg-accent text-center drop-shadow-md">
          <NavBarLink href={"/"} imgSrc={"/header-icons/home"} pText={"HOME"} />
          <NavBarLink
            href={"#tech-stack"}
            imgSrc={"/header-icons/tech-stack"}
            pText={"TECH STACK"}
          />
          <NavBarLink
            href={"#projects"}
            imgSrc={"/header-icons/projects"}
            pText={"PROJECTS"}
          />
          <NavBarLink
            href={"/Chandler-Forrest-Resume.pdf"}
            imgSrc={"/header-icons/resume"}
            pText={"RESUME"}
          />
          <NavBarLink
            href={"/blog"}
            imgSrc={"/header-icons/blog"}
            pText={"BLOG (WIP)"}
          />
          <NavBarAnchor
            href={"mailto:chan4est@gmail.com?subject=I Found Your Website!"}
            imgSrc={"/tech-icons/gmail"}
            pText={"EMAIL"}
          />
          <NavBarAnchor
            href={"https://www.linkedin.com/in/chan4est/"}
            imgSrc={"/tech-icons/linkedin"}
            pText={"LINKEDIN"}
          />
          <NavBarAnchor
            href={"https://github.com/chan4est/"}
            imgSrc={"/tech-icons/github"}
            pText={"GITHUB"}
            hasDarkMode={true}
          />
        </div>
      )}
    </nav>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pl-10 pr-10 pb-10 bg-primary-100 leading-relaxed justify-center">
      <NavBar />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
    </main>
  );
}
