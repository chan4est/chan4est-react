import Link from "next/link";
import Image from "next/image";
import { linkConstants } from "../lib/linkConstants";

const ICONS_PATH = "/footer-icons";

function FooterContactIcon({ link, title, imgSrc, imgWSrc, imgAlt }) {
  return (
    <a
      href={link}
      className="hover:scale-125 transition duration-200 ease-in-out"
      title={title}
    >
      <picture>
        <source srcSet={imgWSrc} media="(prefers-color-scheme: dark)" />
        <Image
          src={imgSrc}
          alt={imgAlt}
          height={30}
          width={30}
          className="h-4 w-4"
          unoptimized={true}
        />
      </picture>
    </a>
  );
}

export function Footer({}) {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  return (
    <footer className="text-xs justify-center align-center text-center bg-background min-w-full pt-2 pb-2 border-t border-button_inactive">
      <div>
        <Link href={linkConstants.HOME} className="p-1 hover:underline">
          HOME
        </Link>
        {" | "}
        <Link href={linkConstants.TECH_STACK} className="p-1 hover:underline">
          TECH STACK
        </Link>
        {" | "}
        <Link href={linkConstants.PROJECTS} className="p-1 hover:underline">
          PROJECTS
        </Link>
        {" | "}
        <Link
          href={linkConstants.RESUME}
          locale={false}
          target="_blank"
          className="p-1 hover:underline"
        >
          RESUME
        </Link>
        {" | "}
        <Link href={linkConstants.BLOG} className="p-1 hover:underline">
          BLOG
        </Link>
      </div>
      <div className="pt-2">
        <Link href={linkConstants.PRIVACY} className="p-1 hover:underline">
          PRIVACY POLICY
        </Link>
        {" — "}
        <Link href={linkConstants.TERMS} className="p-1 hover:underline">
          TERMS & CONDITIONS
        </Link>
      </div>
      <div className="flex flex-row gap-2 justify-center align-center text-center pt-2">
        <span>{currentYear} © Chandler Forrest</span>
        <span
          id="contact"
          className="flex flex-row items-center justify-center gap-2 max-w-fit"
        >
          <FooterContactIcon
            link={linkConstants.LINKEDIN}
            title="Email me"
            imgSrc={`${ICONS_PATH}/gmail.webp`}
            imgWSrc={`${ICONS_PATH}/gmail.webp`}
            imgAlt={"Gmail Logo"}
          />
          <FooterContactIcon
            link={linkConstants.LINKEDIN}
            title="Connect with me on LinkedIn"
            imgSrc={`${ICONS_PATH}/linkedin.webp`}
            imgWSrc={`${ICONS_PATH}/linkedin.webp`}
            imgAlt={"LinkedIn Logo"}
          />
          <FooterContactIcon
            link={linkConstants.GITHUB}
            title="View my GitHub"
            imgSrc={`${ICONS_PATH}/github.webp`}
            imgWSrc={`${ICONS_PATH}/github-w.webp`}
            imgAlt={"GitHub Logo"}
          />
        </span>
      </div>
    </footer>
  );
}
