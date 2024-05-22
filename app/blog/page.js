import Image from "next/image";
import Link from "next/link";
import { blogEntries } from "../lib/blogEntries";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function BlogPreview({ blogInfo }) {
  return (
    <>
      <Link href="/blog/" title={blogInfo.title}>
        <Image
          src={`${blogInfo.folder}/${blogInfo.preview}.webp`}
          alt={`${blogInfo.location}`}
          width={300}
          height={300}
          quality={100}
          className="max-h-[300px] object-cover"
        />
      </Link>
      <p className="pt-1 text-sm">{blogInfo.title}</p>
    </>
  );
}

function BlogGrid({}) {
  let blogPreviews = [];
  blogEntries.forEach((item) => {
    blogPreviews.push(<BlogPreview blogInfo={item} key={item.title} />);
  });
  return (
    <div className="flex flex-col justify-center content-center">
      <div className="grid grid-cols-3 gap-1 pr-1 pl-1">{blogPreviews}</div>
    </div>
  );
}

export default function Blog() {
  const blogPreviewLength = blogEntries.length - 1;
  const randomInt = getRandomInt(blogPreviewLength) + 1;
  return (
    <div className="flex min-h-screen flex-col text-center content-center justify-center items-center p-l-10 p-r-10 pt-1 pb-1">
      {/* <BlogGrid /> */}
      <h3>Work In Progress</h3>
      <BlogPreview blogInfo={blogEntries[randomInt]} />
    </div>
  );
}
