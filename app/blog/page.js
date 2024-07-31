import Image from "next/image";
import Link from "next/link";
import chanPhotoIndia from "../../public/me-india.webp";
import { NavBar } from "../components/Navbar";
import { blogEntriesSimple } from "../lib/blogEntriesSimple";
import calculateAge from "../lib/calculateAge";

export const metadata = {
  title: "chan4est | Blog",
  description: "Chandler's Personal Blog",
};

function BlogGridSquare({ imgSrc, imgLocationName, entryTitle, entryRoute }) {
  return (
    <Link href={`/blog/${entryRoute}`} title={entryTitle}>
      <Image
        src={imgSrc}
        alt={`Photo of ${imgLocationName}`}
        width={300}
        height={300}
        quality={100}
        className="max-h-[300px] object-cover"
        priority={true}
        loading={"eager"}
      />
    </Link>
  );
}

function BlogGrid({ blogEntries }) {
  const blogPreviews = blogEntries.map((entry, index) => {
    const firstImageData = entry.images[entry.previewIndex];
    const entryTitlePrev = index > 0 ? blogEntries[index - 1].pageTitle : null;
    const entryTitleNext =
      index < blogEntries.length - 1 ? blogEntries[index + 1].pageTitle : null;

    return (
      <BlogGridSquare
        imgSrc={firstImageData.src}
        entryTitle={entry.pageTitle}
        entryRoute={entry.route}
        entryTitlePrev={entryTitlePrev}
        entryTitleNext={entryTitleNext}
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
  const flagLinks = blogEntries.map((entry, i) =>
    entry.countryNames.map((cName, j) => (
      <FlagLink
        flagEmoji={entry.flags[j]}
        link={`/blog/${entry.route}`}
        title={cName}
        key={cName}
      />
    ))
  );
  const flagLinksRev = flagLinks.reverse();

  const age = calculateAge("06301996");

  return (
    <section className="flex flex-col sm:flex-row items-center pl-4 pr-4 pb-4 sm:pb-10">
      <div id="age" className="flex-shrink-0">
        <Image
          src={chanPhotoIndia}
          alt={"Chandler at the Taj Mahal"}
          width={200}
          height={200}
          quality={80}
          className="rounded-full"
          priority={true}
          loading={"eager"}
        />
      </div>
      <div
        id="blurb"
        className="flex flex-column items-center pt-3 sm:pl-10  text-left max-w-[26rem] text-[0.875rem] md:text-base"
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
              {flagLinksRev}
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default function Blog() {
  const blogEntries = blogEntriesSimple;
  return (
    <div className="bg-accent flex flex-1 flex-col text-center content-center items-center">
      <NavBar />
      <BlogHeader blogEntries={blogEntries} />
      <BlogGrid blogEntries={blogEntries} />
    </div>
  );
}
