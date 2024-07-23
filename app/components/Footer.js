import Link from "next/link";
import Image from "next/image";

export function Footer({}) {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  return (
    <footer className="text-sm justify-center align-center text-center bg-accent min-w-full pt-2 pb-2 border-t-2">
      <div>
        <Link href="/" className="p-1 hover:underline">
          HOME
        </Link>
        {" | "}
        <Link href="/#tech-stack" className="p-1 hover:underline">
          TECH STACK
        </Link>
        {" | "}
        <Link href="/#projects" className="p-1 hover:underline">
          PROJECTS
        </Link>
        {" | "}
        <Link
          href={"Chandler Forrest Resume.pdf"}
          locale={false}
          target="_blank"
          className="p-1 hover:underline"
        >
          RESUME
        </Link>
        {" | "}
        <Link href="/blog" className="p-1 hover:underline">
          BLOG
        </Link>
      </div>
      <div className="flex flex-row gap-2 justify-center align-center text-center pt-2">
        <span>{currentYear} © Chandler Forrest</span>
        <span
          id="contact"
          className="flex flex-row items-center justify-center gap-2 max-w-fit"
        >
          <a
            href="mailto:chan4est@gmail.com?subject=I Found Your Website!"
            className="hover:scale-125"
          >
            <Image
              src={`/tech-icons/gmail.webp`}
              height={15}
              width={15}
              alt="Gmail Logo"
              quality={100}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/chan4est/"
            className="hover:scale-125"
          >
            <Image
              src={`/tech-icons/linkedin.webp`}
              height={15}
              width={15}
              alt="LinkedIn Logo"
              quality={100}
            />
          </a>
          <a href="https://github.com/chan4est/" className="hover:scale-125">
            <picture>
              <source
                srcSet={"/tech-icons/github-w.webp"}
                media="(prefers-color-scheme: dark)"
              />
              <Image
                src={"/tech-icons/github.webp"}
                height={15}
                width={15}
                alt="GitHub Logo"
                quality={100}
              />
            </picture>
          </a>
        </span>
      </div>
    </footer>
  );
}
