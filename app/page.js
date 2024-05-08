import Image from "next/image";
import chanPhoto from "../public/me.webp";
import Link from "next/link";
import { techStackDataSorted } from "./lib/techStackDataSorted.js";

function StackIcon({ stackImg, stackImgAlt, stackText, stackLink }) {
  return (
    <Link
      href={stackLink}
      className="flex flex-col pt-5 justify-center items-center text-center hover:scale-125"
    >
      <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14">
        <Image
          src={`/tech-icons/${stackImg}.webp`}
          alt={stackImgAlt}
          width={100}
          height={100}
          className=""
          quality={100}
        />
      </div>
      <span className={"text-xs min-[550px]:text-base"}>{stackText}</span>
    </Link>
  );
}

function AboutSection({}) {
  return (
    <section id="intro" className="flex flex-col">
      <div
        id="picAndInfo"
        className="flex flex-col md:flex-row items-center justify-center"
      >
        <Link href="/blog/2023/tokyo" className="hover:scale-105">
          <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0">
            <Image
              src={chanPhoto}
              alt="Chandler at the Pokemon Cafe in Tokyo, Japan"
              className="rounded-xl"
            ></Image>
          </div>
        </Link>
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
      <p className="pt-5">
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
        <Link
          href="https://docs.google.com/spreadsheets/d/1JjRG0ecEKX-PcujPT5zeRwYcGetAocj5kE3DGuULYkQ/edit?usp=sharing"
          className="underline"
        >
          concert/music festival
        </Link>
        ,{" "}
        <Link
          href="https://howlongtobeat.com/user/chan4est"
          className="underline"
        >
          playing video games
        </Link>
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
        <Link
          href="mailto:chan4est@gmail.com?subject=I Found Your Website!"
          className="hover:scale-125"
        >
          <Image
            src={`/tech-icons/gmail.webp`}
            height={35}
            width={35}
            alt="GMail Logo"
          ></Image>
        </Link>
        <Link
          href="https://www.linkedin.com/in/chan4est/"
          className="hover:scale-125"
        >
          <Image
            src={`/tech-icons/linkedin.webp`}
            height={35}
            width={35}
            alt="LinkedIn Logo"
          ></Image>
        </Link>
        <Link href="https://github.com/chan4est/" className="hover:scale-125">
          <Image
            src={`/tech-icons/github.webp`}
            height={35}
            width={35}
            alt="GitHub Logo"
          ></Image>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  let languageList = [];
  techStackDataSorted.languages.forEach((item) => {
    languageList.push(
      <StackIcon
        key={item.img}
        stackImg={item.img}
        stackImgAlt={`${item.name} Logo`}
        stackText={item.name}
        stackLink={item.link}
      />
    );
  });

  let frameworkList = [];
  techStackDataSorted.frameworks.forEach((item) => {
    frameworkList.push(
      <StackIcon
        key={item.img}
        stackImg={item.img}
        stackImgAlt={`${item.name} Logo`}
        stackText={item.name}
        stackLink={item.link}
      />
    );
  });

  let databaseList = [];
  techStackDataSorted.databases.forEach((item) => {
    databaseList.push(
      <StackIcon
        key={item.img}
        stackImg={item.img}
        stackImgAlt={`${item.name} Logo`}
        stackText={item.name}
        stackLink={item.link}
      />
    );
  });

  let infrastructureList = [];
  techStackDataSorted.infrastructure.forEach((item) => {
    infrastructureList.push(
      <StackIcon
        key={item.img}
        stackImg={item.img}
        stackImgAlt={`${item.name} Logo`}
        stackText={item.name}
        stackLink={item.link}
      />
    );
  });

  let toolsList = [];
  techStackDataSorted.tools.forEach((item) => {
    toolsList.push(
      <StackIcon
        key={item.img}
        stackImg={item.img}
        stackImgAlt={`${item.name} Logo`}
        stackText={item.name}
        stackLink={item.link}
      />
    );
  });

  let programsList = [];
  techStackDataSorted.programs.forEach((item) => {
    programsList.push(
      <StackIcon
        key={item.img}
        stackImg={item.img}
        stackImgAlt={`${item.name} Logo`}
        stackText={item.name}
        stackLink={item.link}
      />
    );
  });

  let surfaceList = [];
  techStackDataSorted.surface.forEach((item) => {
    surfaceList.push(
      <StackIcon
        key={item.img}
        stackImg={item.img}
        stackImgAlt={`${item.name} Logo`}
        stackText={item.name}
        stackLink={item.link}
      />
    );
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-primary-100 leading-relaxed justify-center">
      <div className="max-w-screen-md">
        {/* <nav>
          <ul className="flex items-left text-2xl pb-10 m-2 space-x-10">
            <li>
              <Link href="#">HOME</Link>
            </li>
            <li>
              <Link href="#techstack">TECH STACK</Link>
            </li>
            <li>
              <Link href="#projects">PROJECTS</Link>
            </li>
            <li>
              <Link
                href={"Chandler Forrest Resume.pdf"}
                locale={false}
                target="_blank"
              >
                RESUME{" "}
              </Link>
            </li>
            <li>
              <Link href="/blog">BLOG</Link>
            </li>
            <li>
              <Link href="/">CONTACT</Link>
            </li>
          </ul>
        </nav> */}
        <AboutSection />
        <section id="tech-stack">
          <div
            className="flex flex-row justify-center items-center pt-5"
            id="techstack-header"
          >
            <h3 className="pr-3">Tech Stack</h3>
            <div className="w-7 h-7">
              <Image
                src={"/header-icons/tech-stack.webp"}
                alt="Tech Stack Vector Logo"
                width={50}
                height={50}
              ></Image>
            </div>
          </div>
          <p className="">
            These are the technologies I&apos;ve used during my professional
            career. I would feel confident working with them or things adjacent
            to them daily. Other items that I have experience with but not at a
            super in depth level are listed at the very bottom.
          </p>
          <div className="flex justify-center content-center flex-col">
            <h5 className="pt-5">Languages</h5>
            <div className="grid grid-cols-6 grid-rows-1 gap-x-5">
              {languageList}
            </div>
            <h5 className="pt-5">Frameworks</h5>
            <div className="grid grid-cols-6 grid-rows-1 gap-x-5">
              {frameworkList}
            </div>
            <h5 className="pt-5">Databases</h5>
            <div className="grid grid-cols-4 grid-rows-1 gap-x-5">
              {databaseList}
            </div>
            <h5 className="pt-5">Infrastructure</h5>
            <div className="grid grid-cols-6 grid-rows-1 gap-x-5">
              {infrastructureList}
            </div>
            <h5 className="pt-5">Programs</h5>
            <div className="grid grid-cols-5 grid-rows-1 gap-x-5">
              {programsList}
            </div>
            <h5 className="pt-5">Tools</h5>
            <div className="grid grid-cols-6 grid-rows-1  gap-x-5">
              {toolsList}
            </div>
            <h5 className="pt-5">Surface Level Tech</h5>
            <div className="grid grid-cols-6 grid-rows-2  gap-x-5">
              {surfaceList}
            </div>
          </div>
        </section>
        {/* <section id="projects">
          <div className="flex justify-center pt-5" id="projects">
            <h3>Projects</h3>
            <Image
              src={techStack}
              height={50}
              width={50}
              alt="Tech Stack Vector Logo"
            ></Image>
          </div>

          <p className="pt-5 pl-12 pr-12">
            These are the projects I am most proud of!
          </p>
          <div>
            Dolore labore amet laboris duis est. Id Lorem consequat cupidatat
            aliqua cillum. Aliquip officia consequat irure incididunt ad
            cupidatat veniam. Nostrud mollit tempor adipisicing est. Aliquip
            eiusmod minim fugiat occaecat occaecat proident ex. In fugiat eu
            elit fugiat pariatur voluptate reprehenderit magna consequat
            consectetur. In laboris cupidatat laboris culpa qui in eiusmod
            consequat. Esse labore in commodo fugiat ullamco ex ut anim.
            Consequat magna aute proident nostrud id eiusmod non qui minim
            fugiat nulla excepteur nostrud ea. Cupidatat commodo occaecat
            proident esse sit voluptate consectetur ut pariatur anim non. Dolore
            incididunt ut nostrud consequat ut irure occaecat voluptate sit
            nulla ad. Ad sit proident non eu Lorem sunt ut officia Lorem
            cupidatat consectetur fugiat eiusmod consectetur. Quis nostrud nulla
            est cillum pariatur aute consequat qui laboris ea aliquip
            adipisicing. Lorem eiusmod aute cillum eiusmod duis irure dolor in
            duis.
          </div>
        </section> */}
      </div>
    </main>
  );
}
