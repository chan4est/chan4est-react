import Image from "next/image";
import Link from "next/link";

import { NavDropdown } from "../components/NavDropdown";
import { SortableBlogPhotoGrid } from "../components/SortableBlogPhotoGrid";
import { Footer } from "../components/Footer";

import { blogEntries } from "../lib/blogEntries";
import calculateAge from "../lib/calculateAge";
import { Links } from "../lib/Links";

import chanPhotoNagoya from "../../public/blog/nagoya_castle.webp";

export const metadata = {
  title: "chan4est | Travel Blog",
  description: "Blog detailing my travels around the world 🌎🌍🌏",
  openGraph: {
    title: "chan4est | Travel Blog",
    description: "Chandler's world travel blog",
    url: "/blog",
    image: {
      url: "/",
      width: 1200,
      height: 630,
    },
    local: "en_US",
    type: "website",
  },
};

function FlagLink({ flagEmoji, link, title }) {
  return (
    <Link
      href={link}
      title={title}
      className="drop-shadow-md flex justify-center items-center hover:scale-125 transition duration-200 ease-in-out"
      key={title}
    >
      {`${flagEmoji}`}
    </Link>
  );
}

function BlogHeader({ blogEntries }) {
  const flagLinks = blogEntries.flatMap((blogEntry) => {
    if (!blogEntry.isFlagLink) {
      return [];
    }

    return blogEntry.countryNames
      .map((countryName, index) => {
        const flagEmoji = blogEntry.flags[index];
        const blogRoute = `/blog/${blogEntry.route}`;

        return (
          <FlagLink
            flagEmoji={flagEmoji}
            link={blogRoute}
            title={countryName}
            key={countryName}
          />
        );
      })
      .reverse();
  });

  const reversedFlagLinks = [...flagLinks].reverse();

  const age = calculateAge("06301996");

  return (
    <section className="flex flex-col sm:flex-row items-center px-4 pb-4 sm:pb-0 pt-10">
      <Link
        href={Links.NAGOYA_BLOG}
        className="flex-shrink-0 hover:scale-105 transition duration-200 ease-in-out"
      >
        <Image
          src={chanPhotoNagoya}
          alt={"Nagoya Castle"}
          width={400}
          height={400}
          className="rounded-full h-52 w-52 lg:h-64 lg:w-64"
          priority={true}
          unoptimized={true}
        />
      </Link>
      <div
        id="blurb"
        className="flex flex-column items-center pt-3 sm:pl-10 text-left max-w-[26rem] lg:max-w-[30rem] text-[0.875rem] md:text-base"
      >
        <ul>
          <li>
            <span>Chandler Forrest</span>
            <span className="text-accent pl-2 text-xxs md:text-xs">he/him</span>
          </li>
          <li>{age} | Developer | Traveler | Music Lover</li>
          <li>
            {/* UPDATE: INCREASE GRID-COLS ONCE YOU'VE VISITED MORE COUNTRIES*/}
            <div className="grid grid-cols-18 grid-row gap-x-2">
              {reversedFlagLinks}
            </div>
          </li>
          <br />
          <li>WIP but nearing completion.</li>
          <li>Last update 9/27/24.</li>
        </ul>
      </div>
    </section>
  );
}

export default function Blog() {
  const imagesData = blogEntries.map((entry) => ({
    ...entry.postImages[entry.previewIdx],
    entryTitle: entry.pageTitle,
    entryRoute: Links.BLOG_BACK_LINK(entry.route),
  }));

  return (
    <>
      <div className="bg-background flex flex-1 flex-col text-center content-center items-center">
        <NavDropdown />
        <BlogHeader blogEntries={blogEntries} />
        <SortableBlogPhotoGrid imagesData={imagesData} hasLayersIco={true} />
      </div>
      <Footer />
    </>
  );
}
