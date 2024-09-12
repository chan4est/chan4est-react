import { Footer } from "@/app/components/Footer";
import { NavDropdown } from "@/app/components/NavDropdown";
import { blogEntries } from "@/app/lib/blogEntries";
import { imgURL, r_620 } from "@/app/lib/cloudflareImgNames";
import { Links } from "@/app/lib/Links";
import Image from "next/image";
import Link from "next/link";

function BlogGridSquare({ imgSrc, imgTitle, entryTitle, entryRoute }) {
  return (
    <Link href={entryRoute} title={entryTitle}>
      <Image
        src={imgSrc}
        alt={`Photo of ${imgTitle}`}
        width={310}
        height={310}
        className="max-h-[19.375rem] bg-background"
        priority={true}
        unoptimized={true}
      />
    </Link>
  );
}

function BlogGrid({ blogEntries }) {
  // Map over each blog entry and create blog previews for every image
  const blogPreviews = blogEntries.flatMap((entry, index) => {
    return entry.postImages
      .map((image, imgIndex) => {
        const imgSrc = imgURL(image.imgID, r_620);
        return (
          <BlogGridSquare
            imgSrc={imgSrc}
            imgTitle={image.description}
            entryTitle={entry.pageTitle}
            entryRoute={Links.BLOG_ROUTER_LINK(entry.route, imgIndex)}
            key={`${entry.pageTitle}-${imgIndex}`} // Unique key for each image
          />
        );
      })
      .reverse();
  });

  return (
    <div className="flex flex-col justify-center content-center pb-1 sm:pb-10">
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-1 pr-1 pl-1 md:pl-9 md:pr-9">
        {blogPreviews.reverse()}
      </div>
    </div>
  );
}

export default function Blog() {
  return (
    <>
      <div className="bg-accent flex flex-1 flex-col text-center content-center items-center">
        <NavDropdown />
        <BlogGrid blogEntries={blogEntries} />
      </div>
      <Footer />
    </>
  );
}
