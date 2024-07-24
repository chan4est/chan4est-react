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
  const flagLinks = blogEntries.map((entry) => (
    <FlagLink
      flagEmoji={entry.flag}
      link={`/blog/${entry.route}`}
      title={entry.title}
      key={entry.flag}
    />
  ));
  const flagLinksRev = flagLinks.reverse();

  return (
    <section className="flex flex-col sm:flex-row items-center pl-4 pr-4 pb-4 md:pb-8">
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
    <div className="bg-accent flex min-h-screen flex-col text-center content-center items-center pb-1">
      <NavBar />
      <BlogHeader blogEntries={blogEntries} />
      <BlogGrid blogEntries={blogEntries} />
    </div>
  );
}
