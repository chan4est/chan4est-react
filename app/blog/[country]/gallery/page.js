import Link from "next/link";
import { blogEntries } from "@/app/lib/blogEntries";
import { notFound } from "next/navigation";
import { NavDropdown } from "@/app/components/NavDropdown";
import { Links } from "@/app/lib/Links";
import Image from "next/image";
import { imgURL, r_620 } from "@/app/lib/cloudflareImgNames";

export async function generateMetadata({ params }) {
  let metadata = { title: "404 Not Found" };

  const blogData = blogEntries.find((blog) => blog.route === params.country);

  if (blogData) {
    metadata = {
      title: `chan4est | ${blogData.pageTitle}`,
    };
  }

  return metadata;
}

export async function generateStaticParams() {
  const blogEntryRoutes = blogEntries.map((blogEntry) => ({
    country: blogEntry.route,
  }));
  return blogEntryRoutes;
}

function BlogBackButton({ country }) {
  return (
    <Link
      href={`/blog/${country}`}
      className="hover:bg-accent transition duration-200 ease-in-out flex justify-center content-center \
                    w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 absolute top-1 left-0 md:top-2 md:left-1 lg:top-3 lg:left-2 z-10"
      title="Back"
    >
      <picture>
        <source
          srcSet={"/blog/arrow-w.webp"}
          media="(prefers-color-scheme: dark)"
        />
        <Image
          src={"/blog/arrow.webp"}
          alt=""
          width={50}
          height={50}
          className="p-2 hover:bg-accent hover:scale-110 transition duration-200 ease-in-out rotate-180"
          priority={true}
          unoptimized={true}
        />
      </picture>
    </Link>
  );
}

function PostNavBar({ country }) {
  return (
    <div
      id="topnavbar"
      className="bg-accent flex flex-row justify-center items-center h-[2.75rem]"
    >
      <BlogBackButton country={country} />
      <NavDropdown />
    </div>
  );
}

function GalleryGridSquare({ imgSrc, photoDesc }) {
  return (
    <Image
      src={imgSrc}
      alt={`Photo of ${photoDesc}`}
      title={`${photoDesc}`}
      width={310}
      height={310}
      className="max-h-[19.375rem] bg-background"
      priority={true}
      unoptimized={true}
    />
  );
}

export function GalleryGrid({ blogEntry }) {
  const blogPreviews = blogEntry.postImages.map((imgData, index) => {
    return (
      <GalleryGridSquare
        imgSrc={imgURL(imgData.imgID, r_620)}
        photoDesc={imgData.description}
        key={imgData.imgID}
      />
    );
  });

  return (
    <div className="flex flex-col justify-center content-center">
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-1 p-[0.25rem] sm:gap-1 sm:p-1 md:p-9">
        {blogPreviews}
      </div>
    </div>
  );
}

export default function BlogPage({ params, searchParams }) {
  const blogData = blogEntries.find((blog) => blog.route === params.country);

  // Bogus route
  if (!blogData) {
    return notFound();
  }

  // For the previous and next blog post buttons
  const blogDataIndex = blogEntries.findIndex(
    (blog) => blog.route === params.country
  );

  const postNavBar = <PostNavBar country={params.country} />;

  return (
    <>
      <div className="portrait:hidden landscape:block">{postNavBar}</div>
      <div className="bg-accent flex flex-1 flex-col landscape:justify-center landscape:items-center">
        <div className="sticky top-0 z-20 bg-accent portrait:block landscape:hidden">
          {postNavBar}
        </div>
        <GalleryGrid blogEntry={blogData} />
      </div>
    </>
  );
}
