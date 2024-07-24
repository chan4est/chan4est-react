import Image from "next/image";
import Link from "next/link";
import chanPhoto from "../../public/me.webp";
import { NavBar } from "../components/Navbar";
import { blogEntriesSimple } from "../lib/blogEntriesSimple";

function splitArray(arr) {
  const mid = Math.floor(arr.length / 2);
  const firstHalf = arr.slice(0, mid);
  const secondHalf = arr.slice(mid);
  return [firstHalf, secondHalf];
}

function BlogGridSquare({ blogEntry }) {
  return (
    <Link href={`/blog/${blogEntry.route}`} title={blogEntry.title}>
      <Image
        src={blogEntry.imgurLink}
        alt={blogEntry.title}
        width={300}
        height={300}
        quality={100}
        className="max-h-[300px] object-cover"
      />
    </Link>
  );
}

function BlogGrid({ blogEntries }) {
  const blogPreviews = blogEntries.map((entry) => (
    <BlogGridSquare blogEntry={entry} key={entry.title} />
  ));

  return (
    <div className="flex flex-col justify-center content-center pb-8">
      <div className="grid grid-cols-3 gap-1 pr-1 pl-1">{blogPreviews}</div>
    </div>
  );
}

function BlogHeader({ blogEntries }) {
  const flagLinks = blogEntries.map((entry) => (
    <Link
      href={`/blog/${entry.route}`}
      title={entry.title}
      className="drop-shadow-md"
      key={entry.title}
    >
      {`${entry.flag} `}
      {entry.flag2 ? `${entry.flag2} ` : ""}
    </Link>
  ));
  const flagLinksRev = flagLinks.reverse();
  const [flagsFirstHalf, flagsSecondHalf] = splitArray(flagLinksRev);

  return (
    <section className="flex flex-col sm:flex-row items-center max-w-screen-md pl-4 pr-4 pb-4 md:pb-8">
      <div id="age" className="flex-shrink-0">
        <Image
          src={chanPhoto}
          alt={"Chandler at the Pokemon Cafe in Tokyo, Japan"}
          width={200}
          height={200}
          quality={100}
          className="rounded-full"
        />
      </div>
      <div
        id="blurb"
        className="flex flex-column items-center sm:pl-10 pt-3 text-left max-w-[26rem] text-[0.875rem] md:text-base"
      >
        <ul>
          <li>
            <span>Chandler Forrest</span>
            <span className="text-blog_accent pl-2 text-xs md:text-sm">
              he/him
            </span>
          </li>
          <li>28 | Developer | Traveler | Music Lover</li>
          <li className="text-[0.875rem] md:text-base">{flagLinksRev}</li>
          {/* <li className="text-[0.875rem] lg:text-base">{flagsFirstHalf}</li> */}
          {/* <li className="text-[0.875rem] lg:text-base">{flagsSecondHalf}</li> */}
        </ul>
      </div>
    </section>
  );
}

export default function Blog() {
  const blogEntries = blogEntriesSimple;
  return (
    <div className="bg-accent flex min-h-screen flex-col text-center content-center items-center pb-1">
      <NavBar />
      <BlogHeader blogEntries={blogEntries} />
      <BlogGrid blogEntries={blogEntries} />
    </div>
  );
}
