import Image from "next/image";
import chanPhoto from "../public/me.webp";
import techStack from "../public/tech-stack.png";
import Link from "next/link";
import { techStackData } from "./lib/techStackData.js";
import { blurbs } from "./lib/blurbs.js";

function StackIcon({ stackImg, stackImgAlt, stackText, stackLink }) {
  return (
    <div className="flex pt-5 hover:scale-110">
      <a href={stackLink}>
        <div className="flex justify-center items-center">
          <Image
            src={`/tech-stack-logos/${stackImg}.webp`}
            height={50}
            width={50}
            alt={stackImgAlt}
            className="z-10"
          ></Image>
          <div className="">
            <span
              className={`relative -left-2 pl-3 pr-6 pt-1 pb-1 text-l font-bold `}
            >
              {stackText}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function Home() {
  let techStackList = [];
  techStackData.forEach((item) => {
    techStackList.push(
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
              <a href="#">HOME</a>
            </li>
            <li>
              <a href="#techstack">TECH STACK</a>
            </li>
            <li>
              <a href="#projects">PROJECTS</a>
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
              <a href="/blog">BLOG</a>
            </li>
            <li>
              <a href="/">CONTACT</a>
            </li>
          </ul>
        </nav> */}
        <section id="intro" className="flex flex-col">
          <div
            id="picAndInfo"
            className="flex flex-col md:flex-row items-center justify-center"
          >
            <a href="/blog/2023/tokyo" className="hover:scale-105">
              <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0">
                <Image
                  src={chanPhoto}
                  alt="Chandler at the Pokemon Cafe in Tokyo, Japan"
                  className="rounded-xl"
                ></Image>
              </div>
            </a>
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
            I'm a full-stack software engineer who's built a variety of software
            ranging from high throughput/low latency APIs, highly scaleable data
            pipelines, fully automated testing frameworks, to beautiful
            user-driven websites, and easy-to-use mobile applications.
          </p>
          <p className="pt-5">
            What makes me most fullfilled as an engineer is seeing an idea go
            from a proof of concept to a fully featured production-ready
            application!
          </p>
          <p className="pt-5">
            When I’m not working, I’m usually attending a{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1JjRG0ecEKX-PcujPT5zeRwYcGetAocj5kE3DGuULYkQ/edit?usp=sharing"
              className="underline"
            >
              concert/music festival
            </a>
            ,{" "}
            <a
              href="https://howlongtobeat.com/user/chan4est"
              className="underline"
            >
              playing video games
            </a>
            , or{" "}
            <a href="/blog/" className="underline">
              traveling abroad
            </a>
            !
          </p>
          <p className="pt-5">
            Please drop me a line if you're interested in working together!
          </p>

          <div
            id="contact"
            className="flex flex-row items-center justify-center gap-5 pt-5"
          >
            <a
              href="mailto:chan4est@gmail.com?subject=I Found Your Website!"
              className="hover:scale-110"
            >
              <Image
                src={`/link-logos/gmail.webp`}
                height={35}
                width={35}
                alt="GMail Logo"
              ></Image>
            </a>
            <a
              href="https://www.linkedin.com/in/chan4est/"
              className="hover:scale-110"
            >
              <Image
                src={`/link-logos/linkedin.webp`}
                height={35}
                width={35}
                alt="LinkedIn Logo"
              ></Image>
            </a>
            <a href="https://github.com/chan4est/" className="hover:scale-110">
              <Image
                src={`/link-logos/github.webp`}
                height={35}
                width={35}
                alt="GitHub Logo"
              ></Image>
            </a>
          </div>
        </section>
        {/* <section id="tech-stack">
          <div className="flex justify-center pt-5" id="techstack">
            <h3>Tech Stack</h3>
            <Image
              src={techStack}
              height={50}
              width={50}
              alt="Tech Stack Vector Logo"
            ></Image>
          </div>
          <p className="pl-12 pr-12">{blurbs.stack}</p>
          <div className="grid grid-cols-6 grid-rows-4">{techStackList}</div>
        </section>
        <section id="projects">
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
