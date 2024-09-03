import Image from "next/image";
import Link from "next/link";
import chanPhotoIndia from "../../public/blog/me-india.webp";
import chanPhotoNagoya from "../../public/blog/nagoya_castle.webp";
import layersIcon from "../../public/blog/layers.webp";
import { NavBar } from "../components/Navbar";
import { blogEntries } from "../lib/blogEntries";
import calculateAge from "../lib/calculateAge";
import { imgURL, r_300, r_620 } from "../lib/cloudflareImgNames";

export const metadata = {
  title: "chan4est | Blog 🌎🌍🌏",
  description: "Chandler's Travel Blog",
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
          quality={100}
          className="max-h-[310px] object-cover "
          priority={true}
          loading={"eager"}
          unoptimized={true}
        />
        <Image
          src={layersIcon}
          alt=""
          width={25}
          height={25}
          className="absolute z-10 top-0 right-0 pt-2 pr-2 w-6 h-6 lg:w-7 lg:h-7 pointer-events-none"
          priority={true}
          loading={"eager"}
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
    <div className="flex flex-col justify-center content-center pb-8">
      <div className="grid grid-cols-3 gap-1 pr-1 pl-1">{blogPreviews}</div>
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
    <section className="flex flex-col sm:flex-row items-center pl-4 pr-4 pb-4 sm:pb-10">
      <div id="age" className="flex-shrink-0">
        <Image
          src={chanPhotoNagoya}
          alt={"Nagoya Castle"}
          width={200}
          height={200}
          quality={100}
          className="rounded-full"
          priority={true}
          loading={"eager"}
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
          {/* <li>{age} | Developer | Traveler | Music Lover</li> */}
          <li> This blog is a work in progress. Last update 9/2/24.</li>
          <li>
            {/* UPDATE: INCREASE GRID-COLS ONCE YOU'VE VISITED MORE COUNTRIES*/}
            <div className="grid grid-cols-18 grid-row gap-x-2">
              {reversedFlagLinks}
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default function Blog() {
  return (
    <div className="bg-accent flex flex-1 flex-col text-center content-center items-center">
      <NavBar />
      <BlogHeader blogEntries={blogEntries} />
      <BlogGrid blogEntries={blogEntries} />
    </div>
  );
}
