import Image from "next/image";

import { getBlogEntries } from "../../lib/getBlogEntries";
export default async function BlogPage({ params }) {
  const blogEntries = await getBlogEntries();
  const blogData = blogEntries.filter(
    (blog) => blog.route === params.country
  )[0];
  const blogBlocks = blogData.text.split("\n");
  let blogParagraphs = [];
  blogBlocks.map((text) => {
    blogParagraphs.push(
      <li className="pb-2" key={text}>
        {text}
      </li>
    );
  });
  return (
    <div className="flex min-h-screen flex-col md:flex-row items-center justify-center content-center text-[12px]">
      <div className="flex-shrink-0">
        <Image
          src={blogData.imgurLink}
          alt={`Photo of ${blogData.location}`}
          width={500}
          height={500}
          quality={100}
          className=""
        />
      </div>
      <div className="text-left pl-3 pt-3 pr-3 pb-3 max-w-[450px] md:max-w-[400px]">
        <ul>
          <li className="pb-3">{blogData.title}</li>
          {blogParagraphs}
          <li className="text-gray-300">{blogData.date}</li>
        </ul>
      </div>
    </div>
  );
}
