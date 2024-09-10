import Image from "next/image";
import Link from "next/link";
import chanPhotoNagoya from "../../public/blog/nagoya_castle.webp";
import layersIcon from "../../public/blog/layers.webp";
import { NavDropdown } from "../components/NavDropdown";
import { blogEntries } from "../lib/blogEntries";
import calculateAge from "../lib/calculateAge";
import { imgURL, r_300, r_620 } from "../lib/cloudflareImgNames";
import { Footer } from "../components/Footer";

export const metadata = {
  title: "chan4est | Travel Blog",
  description: "Blog detailing my travels around the world 🌎🌍🌏",
};

function BlogGridSquare({ imgSrc, entryTitle, entryRoute }) {
  return (
    <Link href={`/blog/${entryRoute}`} title={entryTitle}>
      <div className="relative">
        <Image
          src={imgSrc}
          alt={`Photo of ${entryTitle}`}
          width={310}
          height={310}
          className="max-h-[19.375rem]"
          priority={true}
          unoptimized={true}
        />
        <Image
          src={layersIcon}
          alt=""
          width={50}
          height={50}
          className="absolute z-10 top-0 right-0 pt-2 pr-2 w-6 h-6 lg:w-7 lg:h-7 pointer-events-none"
          priority={true}
          unoptimized={true}
        />
      </div>
    </Link>
  );
}

function BlogGrid({ blogEntries }) {
  const blogPreviews = blogEntries.map((entry, index) => {
    const firstImgSrc = imgURL(entry.postImages[entry.previewIdx].imgID, r_620);
    return (
      <BlogGridSquare
        imgSrc={firstImgSrc}
        entryTitle={entry.pageTitle}
        entryRoute={entry.route}
        key={entry.pageTitle}
      />
    );
  });

  return (
    <div className="flex flex-col justify-center content-center pb-1 sm:pb-10">
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-5 gap-1 pr-1 pl-1 md:pl-9 md:pr-9">
        {blogPreviews}
      </div>
    </div>
  );
}

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

    return blogEntry.countryNames.map((countryName, index) => {
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
    });
  });

  const reversedFlagLinks = [...flagLinks].reverse();

  const age = calculateAge("06301996");

  return (
    <section className="flex flex-col sm:flex-row items-center pl-4 pr-4 pb-4 sm:pb-10 pt-10">
      <div id="age" className="flex-shrink-0">
        <Image
          src={chanPhotoNagoya}
          alt={"Nagoya Castle"}
          width={400}
          height={400}
          className="rounded-full h-52 w-52 lg:h-64 lg:w-64"
          priority={true}
          unoptimized={true}
        />
      </div>
      <div
        id="blurb"
        className="flex flex-column items-center pt-3 sm:pl-10 text-left max-w-[26rem] lg:max-w-[30rem] text-[0.875rem] md:text-base"
      >
        <ul>
          <li>
            <span>Chandler Forrest</span>
            <span className="text-blog_accent pl-2 text-xs md:text-sm">
              he/him
            </span>
          </li>
          <li>{age} | Developer | Traveler | Music Lover</li>
          <li>
            {/* UPDATE: INCREASE GRID-COLS ONCE YOU'VE VISITED MORE COUNTRIES*/}
            <div className="grid grid-cols-18 grid-row gap-x-2">
              {reversedFlagLinks}
            </div>
          </li>
          <br></br>
          <li> WIP but nearing completion.</li>
          <li>Last update 9/9/24.</li>
        </ul>
      </div>
    </section>
  );
}

export default function Blog() {
  return (
    <>
      <div className="bg-accent flex flex-1 flex-col text-center content-center items-center">
        <NavDropdown />
        <BlogHeader blogEntries={blogEntries} />
        <BlogGrid blogEntries={blogEntries} />
      </div>
      <Footer />
    </>
  );
}
