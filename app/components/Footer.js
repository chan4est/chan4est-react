import Link from "next/link";
import Image from "next/image";
import { Links } from "../lib/Links";

const ICONS_PATH = "/footer-icons";

export function Footer({}) {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  return (
    <footer className="text-sm justify-center align-center text-center bg-accent min-w-full pt-2 pb-2 border-t border-button_inactive">
      <div>
        <Link href={Links.HOME} className="p-1 hover:underline">
          HOME
        </Link>
        {" | "}
        <Link href={Links.TECH_STACK} className="p-1 hover:underline">
          TECH STACK
        </Link>
        {" | "}
        <Link href={Links.PROJECTS} className="p-1 hover:underline">
          PROJECTS
        </Link>
        {" | "}
        <Link
          href={Links.RESUME}
          locale={false}
          target="_blank"
          className="p-1 hover:underline"
        >
          RESUME
        </Link>
        {" | "}
        <Link href={Links.BLOG} className="p-1 hover:underline">
          BLOG (WIP)
        </Link>
      </div>
      <div className="flex flex-row gap-2 justify-center align-center text-center pt-2">
        <span>{currentYear} © Chandler Forrest</span>
        <span
          id="contact"
          className="flex flex-row items-center justify-center gap-2 max-w-fit"
        >
          <a href={Links.EMAIL} className="hover:scale-125">
            <Image
              src={`${ICONS_PATH}/gmail.webp`}
              height={30}
              width={30}
              alt="Gmail Logo"
              className="h-4 w-4"
              quality={100}
              priority={true}
              unoptimized={true}
            />
          </a>
          <a href={Links.LINKEDIN} className="hover:scale-125">
            <Image
              src={`${ICONS_PATH}/linkedin.webp`}
              height={30}
              width={30}
              alt="LinkedIn Logo"
              className="h-4 w-4"
              quality={100}
              priority={true}
              unoptimized={true}
            />
          </a>
          <a href={Links.GITHUB} className="hover:scale-125">
            <picture>
              <source
                srcSet={`${ICONS_PATH}/github-w.webp`}
                media="(prefers-color-scheme: dark)"
              />
              <Image
                src={`${ICONS_PATH}/github.webp`}
                height={30}
                width={30}
                alt="GitHub Logo"
                className="h-4 w-4"
                quality={100}
                priority={true}
                unoptimized={true}
              />
            </picture>
          </a>
        </span>
      </div>
    </footer>
  );
}
