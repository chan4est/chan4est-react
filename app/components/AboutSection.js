"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import chanPhoto from "../../public/me.webp";
import { linkConstants } from "../lib/linkConstants";
import getUtcOffset from "../lib/getUtcOffset";
import getMilitaryTime from "../lib/getMilitaryTime"

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

export function AboutSection() {
  const [militaryTime, setMilitaryTime] = useState("");
  const [utcOffset, setUtcOffset] = useState("");

  useEffect(() => {
    const timeZone = "America/Los_Angeles";

    // Set initial values
    setMilitaryTime(getMilitaryTime(timeZone));
    setUtcOffset(getUtcOffset(timeZone));

    // Update the time every minute
    const interval = setInterval(() => {
      setMilitaryTime(getMilitaryTime(timeZone));
      setUtcOffset(getUtcOffset(timeZone));
    }, 1000 * 30); // update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="intro" className="flex flex-col max-w-screen-md pb-10">
      <div
        id="picAndInfo"
        className="flex flex-col md:flex-row items-center justify-center"
      >
        {/* <Link
          href={linkConstants.TOKYO_BLOG}
          className="hover:scale-105 transition duration-200 ease-in-out"
          title="Tokyo, Japan 🇯🇵"
        > */}
          <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0">
            <Image
              src={chanPhoto}
              alt="Chandler at the University of Washington Quad during the cherry blossom blooming."
              className="rounded-xl"
              priority={true}
              unoptimized={true}
            />
          </div>
        {/* </Link> */}
        <div className="flex flex-col items-center justify-center pt-5 md:pl-7">
          <ul>
            <li>
              <b>Name:</b> Chandler Forrest
            </li>
            <li>
              <b>Location:</b> SoCal (Temporarily)
            </li>
            <li>
              <b>Time:</b> {militaryTime} ({utcOffset})
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
