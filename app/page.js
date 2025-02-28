import Image from "next/image";
import chanPhoto from "../public/me.webp";
import Link from "next/link";
import { techIconsData } from "./data/techIconsData.js";
import { techStackData } from "./data/techStackData.js";
import { projectsList } from "./data/projectsList.js";
import { NavDropdown } from "./components/NavDropdown";
import { linkConstants } from "./lib/linkConstants";
import { Footer } from "./components/Footer";

export const metadata = {
  title: "chan4est | Home",
};

function StackIcon({
  stackImg,
  stackImgAlt,
  stackName,
  stackShortName,
  stackLink,
  scale,
  hasDarkMode,
}) {
  let imageClass = "w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14";
  let spanClass = "text-xs sm:text-base";
  if (scale == 0.5) {
    imageClass = "w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7";
    spanClass = "text-xs min-[34.375rem]:text-xs min-h-[2.625rem]";
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
          unoptimized={true}
        />
      </picture>
      <span className={`hidden xl:block ${spanClass}`}>{stackName}</span>
      <span className={`block xl:hidden ${spanClass}`}>{stackShortName}</span>
    </a>
  );
}

function generateStackIconList(techIconsArr, scale = 1) {
  const techHash = {};

  Object.values(techIconsData)
    .flat()
    .forEach((item) => {
      techHash[item.img] = (
        <StackIcon
          key={item.img}
          hasDarkMode={item.darkMode || item.darkMode2}
          scale={scale}
          stackImg={`${item.img}`}
          stackImgAlt={`${item.name} Logo`}
          stackLink={item.link}
          stackName={item.name}
          stackShortName={item.shortName ? item.shortName : item.name}
        />
      );
    });

  return techIconsArr.map((item) => techHash[item]).filter(Boolean);
}

function Project({ projectInfo }) {
  let languageList = generateStackIconList(projectInfo.languages, 0.5);
  return (
    <div>
      {/* <h5 className="pt-2 pb-2">{projectInfo.name}</h5> */}
      <div className=" bg-background rounded-xl drop-shadow-md hover:scale-105 transition duration-200 ease-in-out">
        <a href={projectInfo.link}>
          <div>
            <Image
              src={`/projects/${projectInfo.img}`}
              alt={`${projectInfo.name} Twitter Image`}
              width={600}
              height={315}
              className="rounded-t-xl"
              unoptimized={true}
            />
          </div>
          <div className="p-2 border-t border-button_inactive">
            <p className="text-xxs text-text-500">
              {projectInfo.displayLink.toUpperCase()}
            </p>
            <p className="text-sm font-bold line-clamp-1">
              {projectInfo.title}
            </p>
            <p className="text-xs text-text-500 line-clamp-2 sm:min-h-[2.625rem] 2xl:min-h-0 2xl:line-clamp-1">
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

function AboutContactIcon({ link, title, imgSrc, imgSrcW, imgAlt }) {
  return (
    <a
      href={link}
      className="hover:scale-125 transition duration-200 ease-in-out"
      title={title}
    >
      <picture>
        <source srcSet={imgSrcW} media="(prefers-color-scheme: dark)" />
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={35}
          height={35}
          unoptimized={true}
        />
      </picture>
    </a>
  );
}

function SectionHeader({ id, link, title, imgSrc, imgSrcW, imgAlt }) {
  return (
    <Link
      href={link}
      className="flex flex-row justify-center items-center pb-2 hover:scale-105 transition duration-200 ease-in-out"
      id={id}
    >
      <h1 className="pr-3">{title}</h1>

      <picture className="w-12 h-12">
        <source srcSet={imgSrcW} media="(prefers-color-scheme: dark)" />
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={50}
          height={50}
          quality={100}
          priority={true}
          unoptimized={true}
        />
      </picture>
    </Link>
  );
}

function AboutSection({}) {
  return (
    <section id="intro" className="flex flex-col max-w-screen-md pb-10">
      <div
        id="picAndInfo"
        className="flex flex-col md:flex-row items-center justify-center"
      >
        <Link
          href={linkConstants.TOKYO_BLOG}
          className="hover:scale-105 transition duration-200 ease-in-out"
          title="Tokyo, Japan 🇯🇵"
        >
          <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0">
            <Image
              src={chanPhoto}
              alt="Chandler at the Pokemon Cafe in Tokyo, Japan"
              className="rounded-xl"
              priority={true}
              unoptimized={true}
            />
          </div>
        </Link>
        <div className="flex flex-col items-center justify-center pt-5 md:pl-7">
          <ul>
            <li>
              <b>Name:</b> Chandler Forrest
            </li>
            <li>
              <b>Location:</b> Seattle (GMT -07:00)
            </li>
            <li>
              <b>Alma Mater:</b> UC Santa Barbara
            </li>
            <li>
              <b>Degree:</b> B.S. Computer Science
            </li>
            <li>
              <b>Fav Languages:</b> Python & TypeScript
            </li>
            <li>
              <b>Working at:</b>{" "}
              <a
                href={linkConstants.RADAR}
                className="underline hover:text-button_inactive"
              >
                RADAR
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="pt-5 ">
        I&apos;m a full stack software engineer who&apos;s built a variety of
        software ranging from high throughput/low latency APIs, highly scaleable
        data pipelines, fully automated testing frameworks, to beautiful
        user-driven websites, and easy-to-use mobile applications.
      </p>
      <p className="pt-5">
        What makes me most fulfilled as an engineer is seeing an idea go from a
        proof of concept to a fully featured production-ready application!
      </p>
      <p className="pt-5">
        Right now I&apos;m working on some amazing projects at{" "}
        <a
          href={linkConstants.RADAR}
          className="underline hover:text-button_inactive"
        >
          RADAR
        </a>
        !
      </p>
      <p className="pt-5">
        When I&apos;m not working, I&apos;m usually attending a{" "}
        <a
          href={linkConstants.CONCERT_SHEET}
          className="underline hover:text-button_inactive"
        >
          concert/music festival
        </a>
        ,{" "}
        <a
          href={linkConstants.GAMES}
          className="underline hover:text-button_inactive"
        >
          playing video games
        </a>
        , or{" "}
        <Link
          href={linkConstants.BLOG}
          className="underline hover:text-button_inactive"
        >
          traveling abroad
        </Link>
        !
      </p>

      <p className="pt-5">
        I&apos;m not currently looking for any new opportunities, but if you
        want to contact me for any other reason please drop me a line!
      </p>
      <div
        id="contact"
        className="flex flex-row items-center justify-center gap-5 pt-5"
      >
        <AboutContactIcon
          link={linkConstants.EMAIL}
          title="Email me"
          imgSrc={`/tech-icons/gmail.webp`}
          imgSrcW={`/tech-icons/gmail.webp`}
          alt="Gmail Logo"
        />
        <AboutContactIcon
          link={linkConstants.LINKEDIN}
          title="Connect with me on LinkedIn"
          imgSrc={`/tech-icons/linkedin.webp`}
          srcW={`/tech-icons/linkedin.webp`}
          alt="LinkedIn Logo"
        />
        <AboutContactIcon
          link={linkConstants.GITHUB}
          title="View my GitHub"
          imgSrc={`/tech-icons/github.webp`}
          imgSrcW={`/tech-icons/github-w.webp`}
          alt="GitHub Logo"
        />
      </div>
    </section>
  );
}

function ProjectSection({}) {
  const projects = projectsList.map((project) => (
    <Project projectInfo={project} key={project.name} />
  ));

  return (
    <section
      id="projects"
      className="pt-5 max-w-screen-2xl flex flex-col justify-center items-center"
    >
      <SectionHeader
        id={"projects-header"}
        link={linkConstants.PROJECTS}
        title={"Projects"}
        imgSrc={"/header-icons/projects.webp"}
        imgSrcW={"/header-icons/projects-w.webp"}
        imgAlt={"Projects vector logo"}
      />
      <div className="flex justify-center content-center flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {projects}
        </div>
      </div>
    </section>
  );
}

function TechStackSection({}) {
  const languageList = generateStackIconList(techStackData.languages);
  const webList = generateStackIconList(techStackData.web);
  const databaseList = generateStackIconList(techStackData.databases);
  const infrastructureList = generateStackIconList(
    techStackData.infrastructure
  );
  const toolsList = generateStackIconList(techStackData.tools);

  return (
    <section
      id="tech-stack"
      className="pt-5 max-w-screen-md flex flex-col justify-center items-center "
    >
      <SectionHeader
        id={"techStackData-header"}
        link={linkConstants.TECH_STACK}
        title={"Tech Stack"}
        imgSrc={"/header-icons/tech-stack.webp"}
        imgSrcW={"/header-icons/tech-stack-w.webp"}
        imgAlt={"Tech stack vector logo"}
      />

      <p className="pb-2">
        {
          "These are the technologies I've used during my professional carreer and in personal projects. I'd feel confident working with any of them daily."
        }
      </p>
      <div className="flex justify-center content-center flex-col pb-10">
        <h4 className="">Programming Languages</h4>
        <div className="grid grid-cols-6 grid-rows-1 gap-x-5 pt-3 pb-3">
          {languageList}
        </div>
        <h4 className="">Web Development</h4>
        <div className="hidden sm:grid grid-cols-10 grid-rows-1 gap-x-5 pt-3 pb-3">
          {webList}
        </div>
        <div className="sm:hidden grid grid-cols-5 grid-rows-1 gap-x-5 gap-y-5 pt-3 pb-3">
          {webList}
        </div>
        <h4 className="">Databases</h4>
        <div className="grid grid-cols-7 grid-rows-1 gap-x-5 pt-3 pb-3">
          {databaseList}
        </div>
        <h4 className="">Infrastructure</h4>
        <div className="hidden sm:grid grid-cols-9 grid-rows-1 gap-x-5 pt-3 pb-3">
          {infrastructureList}
        </div>
        <div className="sm:hidden grid grid-cols-5 grid-rows-1 gap-x-5 gap-y-5 pt-3 pb-3">
          {infrastructureList}
        </div>
        <h4 className="">Tools + Programs</h4>
        <div className="grid grid-cols-8 grid-rows-1 gap-x-5 pt-3 pb-3">
          {toolsList}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <NavDropdown />
      <div className="flex min-h-screen flex-col items-center pl-8 pr-8 pb-10 pt-10 leading-relaxed justify-center">
        <AboutSection />
        <ProjectSection />
        <TechStackSection />
      </div>
      <Footer />
    </>
  );
}
