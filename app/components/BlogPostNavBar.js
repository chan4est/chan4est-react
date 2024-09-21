import Image from "next/image";
import Link from "next/link";
import { NavDropdown } from "./NavDropdown";

function BlogBackButton({ link }) {
  return (
    <Link
      href={link}
      className="hover:bg-background transition duration-200 ease-in-out flex justify-center content-center \
                      w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 absolute top-1 left-0 md:top-2 md:left-1 lg:top-3 lg:left-2 z-10"
      title="Back"
    >
      <picture>
        <source
          srcSet={"/blog/arrow-w.webp"}
          media="(prefers-color-scheme: dark)"
        />
        <Image
          src={"/blog/arrow.webp"}
          alt=""
          width={50}
          height={50}
          className="p-2 hover:bg-background hover:scale-110 transition duration-200 ease-in-out rotate-180"
          priority={true}
          unoptimized={true}
        />
      </picture>
    </Link>
  );
}

export function BlogPostNavBar({ blogBackLink, innerText }) {
  return (
    <div
      id="topnavbar"
      className="bg-background flex flex-row justify-center items-center h-[2.75rem]"
    >
      <BlogBackButton link={blogBackLink} />
      <div className="landscape:hidden portrait:block portrait:sm:hidden">
        {innerText}
      </div>
      <NavDropdown />
    </div>
  );
}
