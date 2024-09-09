import Image from "next/image";
import chanPhoto from "../public/me.webp";
import Link from "next/link";
import { techIconsData } from "./lib/techIconsData.js";
import { techStack } from "./lib/techStack.js";
import { projectsList } from "./lib/projectsList.js";
import { NavDropdown } from "./components/NavDropdown";
import { Links } from "./lib/Links";
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
          quality={50}
          unoptimized={true}
        />
      </picture>
      <span className={`hidden sm:block ${spanClass}`}>{stackName}</span>
      <span className={`block sm:hidden ${spanClass}`}>{stackShortName}</span>
    </a>
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
        stackName={item.name}
        stackShortName={item.shortName ? item.shortName : item.name}
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

function Project({ projectInfo }) {
  let languageList = generateStackIconList(projectInfo.languages, 0.5);
  return (
    <div>
      {/* <h5 className="pt-2 pb-2">{projectInfo.name}</h5> */}
      <div className=" bg-accent rounded-xl drop-shadow-md hover:scale-105 transition duration-200 ease-in-out">
        <a href={projectInfo.link}>
          <div>
            <Image
              src={`/projects/${projectInfo.img}`}
              alt={`${projectInfo.name} Twitter Image`}
              width={600}
              height={315}
              className="rounded-t-xl"
              quality={80}
            />
          </div>
          <div className="p-2 border-t border-button_inactive">
            <p className="text-xs text-text-500">
              {projectInfo.displayLink.toUpperCase()}
            </p>
            <p className="text-sm font-bold line-clamp-1">
              {projectInfo.title}
            </p>
            <p className="text-sm text-text-500 line-clamp-2 sm:min-h-[2.625rem] 2xl:min-h-0 2xl:line-clamp-1">
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

function AboutContactIcon({ link, title, src, srcW, alt }) {
  return (
    <a
      href={link}
      className="hover:scale-125 transition duration-200 ease-in-out"
      title={title}
    >
      <picture>
        <source srcSet={srcW} media="(prefers-color-scheme: dark)" />
        <Image
          src={src}
          height={35}
          width={35}
          alt={alt}
          quality={100}
          unoptimized={true}
        />
      </picture>
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
        <Link
          href={Links.TOKYO_BLOG}
          className="hover:scale-105 transition duration-200 ease-in-out"
          title="Tokyo, Japan 🇯🇵"
        >
          <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0">
            <Image
              src={chanPhoto}
              alt="Chandler at the Pokemon Cafe in Tokyo, Japan"
              className="rounded-xl"
              quality={80}
              priority={true}
              loading={"eager"}
            />
          </div>
        </Link>
        <div className="flex flex-col items-center justify-center pt-5 md:pl-7">
          <ul className="">
            <li>
              <b>Name:</b> Chandler Forrest
            </li>
            <li>
              <b>Location:</b> Seattle (GMT -07:00)
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
              <b>Favorite Languages:</b> Python & JavaScript
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
        When I&apos;m not working, I&apos;m usually attending a{" "}
        <a
          href={Links.CONCERT_SHEET}
          className="underline hover:text-button_inactive"
        >
          concert/music festival
        </a>
        ,{" "}
        <a href={Links.GAMES} className="underline hover:text-button_inactive">
          playing video games
        </a>
        , or{" "}
        <Link
          href={Links.BLOG}
          className="underline hover:text-button_inactive"
        >
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
        <AboutContactIcon
          link={Links.EMAIL}
          title="Email me"
          src={`/tech-icons/gmail.webp`}
          srcW={`/tech-icons/gmail.webp`}
          alt="Gmail Logo"
        />
        <AboutContactIcon
          link={Links.LINKEDIN}
          title="Connect with me on LinkedIn"
          src={`/tech-icons/linkedin.webp`}
          srcW={`/tech-icons/linkedin.webp`}
          alt="LinkedIn Logo"
        />
        <AboutContactIcon
          link={Links.GITHUB}
          title="View my GitHub"
          src={`/tech-icons/github.webp`}
          srcW={`/tech-icons/github-w.webp`}
          alt="GitHub Logo"
        />
      </div>
    </section>
  );
}

function TechStackSection({}) {
  const languageList = generateStackIconList(techStack.languages);
  const webList = generateStackIconList(techStack.web);
  const databaseList = generateStackIconList(techStack.databases);
  const infrastructureList = generateStackIconList(techStack.infrastructure);
  const toolsList = generateStackIconList(techStack.tools);

  return (
    <section id="tech-stack" className="max-w-screen-md">
      <div
        className="flex flex-row justify-center items-center pt-5"
        id="techstack-header"
      >
        <Link href={Links.TECH_STACK}>
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
              quality={50}
            />
          </picture>
        </div>
      </div>
      <p className="pb-2 pt-2">
        {
          "These are the technologies I've used during my professional carreer and in personal projects. I'd feel confident working with any of them daily."
        }
      </p>
      <div className="flex justify-center content-center flex-col pb-10">
        <h5 className="">Programming Languages</h5>
        <div className="grid grid-cols-6 grid-rows-1 gap-x-5 pt-3 pb-3">
          {languageList}
        </div>
        <h5 className="">Web Development</h5>
        <div className="grid grid-cols-8 grid-rows-1 gap-x-5 pt-3 pb-3">
          {webList}
        </div>
        <h5 className="">Databases</h5>
        <div className="grid grid-cols-7 grid-rows-1 gap-x-5 pt-3 pb-3">
          {databaseList}
        </div>
        <h5 className="">Infrastructure</h5>
        <div className="grid grid-cols-7 grid-rows-1 gap-x-5 pt-3 pb-3">
          {infrastructureList}
        </div>
        <h5 className="">Tools + Programs</h5>
        <div className="grid grid-cols-8 grid-rows-1 gap-x-5 pt-3 pb-3">
          {toolsList}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({}) {
  let projects = [];
  projectsList.forEach((item) => {
    projects.push(<Project projectInfo={item} key={item.name} />);
  });
  return (
    <section
      id="projects"
      className="pt-5 max-w-screen-2xl flex flex-col justify-center items-center "
    >
      <div
        className="flex flex-row justify-center items-center"
        id="projects-header"
      >
        <Link href={Links.PROJECTS}>
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
              quality={80}
            />
          </picture>
        </div>
      </div>

      <div className="flex justify-center content-center flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {projects}
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
        <ProjectsSection />
        <TechStackSection />
      </div>
      <Footer />
    </>
  );
}
