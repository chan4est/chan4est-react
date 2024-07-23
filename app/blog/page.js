// "use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import chanPhoto from "../../public/me.webp";
import { getBlogEntries } from "../lib/getBlogEntries.js";
import { NavBar } from "../components/Navbar";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function BlogPreview({ blogEntry }) {
  return (
    <>
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
    </>
  );
}

function BlogGrid({ blogEntries }) {
  let blogPreviews = [];
  blogEntries.forEach((entry) => {
    blogPreviews.push(<BlogPreview blogEntry={entry} key={entry.title} />);
  });
  return (
    <div className="flex flex-col justify-center content-center">
      <div className="grid grid-cols-3 gap-1 pr-1 pl-1">{blogPreviews}</div>
    </div>
  );
}

function BlogHeader({ blogEntries }) {
  let flagLinks = [];
  blogEntries.map((entry) => {
    flagLinks.unshift(
      <Link
        href={`/blog/${entry.route}`}
        title={entry.title}
        className="hover:scale-125 transition duration-200 ease-in-out"
        key={entry.title}
      >
        {`${entry.flag} `}
        {entry.flag2 ? `${entry.flag2} ` : ""}
      </Link>
    );
  });
  return (
    <section className="flex flex-col sm:flex-row items-center pb-5 max-w-screen-md pl-5 pr-5">
      <div className="flex-shrink-0">
        <Image
          src={chanPhoto}
          alt={"Chandler at the Pokemon Cafe in Tokyo, Japan"}
          width={200}
          height={200}
          quality={100}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-column items-center sm:pl-10 pt-3 text-left max-w-[26rem]">
        <ul>
          <li>
            <span>Chandler Forrest</span>
            <span className="text-blog_accent pl-2 text-sm">he/him</span>
          </li>
          <li>28 | Developer | Traveler | Music Lover</li>
          <li>
            🇺🇸 🇬🇧 🇧🇪 🇳🇱 🇩🇪 🇨🇿 🇦🇹 🇭🇺 🇮🇹 🇻🇦 🇫🇷 🇪🇸 🇵🇹 🇧🇷 🇦🇷 🇵🇪 🇨🇴 🇯🇵 🇻🇳 🇰🇭 🇹🇭 🇸🇬 🇵🇭{" "}
            {flagLinks}…
          </li>
        </ul>
      </div>
    </section>
  );
}

export default async function Blog() {
  const blogEntries = await getBlogEntries();
  return (
    <div className="flex min-h-screen flex-col text-center content-center items-center pb-1">
      <NavBar />
      <BlogHeader blogEntries={blogEntries} />
      <BlogGrid blogEntries={blogEntries} />
    </div>
  );
}
