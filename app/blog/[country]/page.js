import Link from "next/link";
import { blogEntries } from "@/app/lib/blogEntries";
import { notFound } from "next/navigation";
import { NavDropdown } from "@/app/components/NavDropdown";
import BlogImages from "@/app/components/BlogImages";
import { Links } from "@/app/lib/Links";
import NurtureCoordinates from "@/app/components/NurtureCoordinates";
import Image from "next/image";

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

// Shown only in smaller window widths (phones, tablets)
function BlogBackButton({}) {
  return (
    <Link
      href={Links.BLOG}
      className="rounded-full hover:bg-accent  transition duration-200 ease-in-out flex justify-center content-center \
                    w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 absolute top-1 left-0 md:top-2 md:left-1 lg:top-3 lg:left-2 z-20"
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
          className="p-2 rounded-lg hover:bg-accent hover:scale-110 transition duration-200 ease-in-out rotate-180"
          priority={true}
          unoptimized={true}
        />
      </picture>
    </Link>
  );
}

function RoundButton({}) {
  return (
    <picture>
      <source
        srcSet={"/blog/arrow-w.webp"}
        media="(prefers-color-scheme: dark)"
      />
      <Image
        src={"/blog/arrow.webp"}
        alt=""
        width={34}
        height={34}
        className="rounded-full border-2 p-2 border-text hover:bg-accent hover:scale-110 transition duration-200 ease-in-out md:h-[2.5rem] md:w-[2.5rem]"
        priority={true}
        unoptimized={true}
      />
    </picture>
  );
}

function PostNavButtons({ prevBlogData, nextBlogData }) {
  const prevPostButton = prevBlogData && (
    <Link
      href={`/blog/${prevBlogData.route}`}
      className="fixed top-1/2 left-2 md:left-3 lg:left-5 transform -translate-y-1/2 z-10 rotate-180"
      title={prevBlogData.pageTitle}
    >
      <RoundButton isRotated={true} />
    </Link>
  );

  const nextPostButton = nextBlogData && (
    <Link
      href={`/blog/${nextBlogData.route}`}
      className="fixed top-1/2 right-2 md:right-3 lg:right-5 transform -translate-y-1/2 z-10"
      title={nextBlogData.pageTitle}
    >
      <RoundButton isRotated={false} />
    </Link>
  );

  return (
    <div className="hidden sm:block landscape:hidden">
      {prevBlogData ? prevPostButton : ""}
      {nextBlogData ? nextPostButton : ""}
    </div>
  );
}

function PostNavBar({ nurtureCoords }) {
  return (
    <div
      id="topnavbar"
      className="flex flex-row justify-center items-center h-[2.75rem] lg:h-[4.625rem]"
    >
      <BlogBackButton />
      <div className="flex sm:hidden landscape:flex">{nurtureCoords}</div>
      <NavDropdown />
    </div>
  );
}

function BlogText({ title, paragraphs, publishDate }) {
  return (
    <div
      className="text-left max-w-[28.125rem] text-[0.75rem] overflow-x-hidden \
     landscape:max-w-[300px] landscape:max-h-[330px] landscape:overflow-y-auto landscape:pl-3 landscape:pr-3 md:mb-4 pl-3 pr-3 sm:pl-0 sm:pr-0 pb-6"
    >
      <p>
        <b>{title}</b>
      </p>
      <br />
      {paragraphs}
      <p className="text-blog_accent">{publishDate}</p>
    </div>
  );
}

export default function BlogPage({ params, searchParams }) {
  const blogData = blogEntries.find((blog) => blog.route === params.country);

  // Bogus route
  if (!blogData) {
    return notFound();
  }

  // -1 to account for 0 based indexing
  const imgIndex =
    searchParams && searchParams.img_index ? searchParams.img_index - 1 : 0;

  // -1 to account for 0 based indexing
  const txtIndex =
    searchParams && searchParams.txt_index ? searchParams.txt_index - 1 : 0;

  // For the previous and next blog post buttons
  const blogDataIndex = blogEntries.findIndex(
    (blog) => blog.route === params.country
  );
  const prevBlogData =
    blogDataIndex > 0 ? blogEntries[blogDataIndex - 1] : null;
  const nextBlogData =
    blogDataIndex < blogEntries.length - 1
      ? blogEntries[blogDataIndex + 1]
      : null;

  const blogParagraphs = blogData.caption.content.split("\n").map((text) => (
    <div key={text}>
      <p>{text}</p>
      <br />
    </div>
  ));

  const blogImageDescriptions = blogData.postImages.map(
    (imageData) => imageData.description
  );

  const blogText = (
    <BlogText
      title={blogData.caption.title}
      paragraphs={blogParagraphs}
      publishDate={blogData.caption.publishDate}
      imageDescriptions={blogImageDescriptions}
      route={params.country}
      txtIndex={txtIndex}
    />
  );

  const firstImageData = blogData.postImages[blogData.previewIdx];
  const nurtureCoordinates = (
    <NurtureCoordinates
      imgLocationLat={firstImageData.coordinates.lat}
      imgLocationLong={firstImageData.coordinates.long}
      imgLocationLink={firstImageData.coordinates.link}
    />
  );

  return (
    <div className="bg-accent flex flex-1 flex-col">
      <div className="sticky top-0 bg-accent">
        <PostNavBar nurtureCoords={nurtureCoordinates} />
        <div className="landscape:flex landscape:flex-row landscape:justify-center landscape:items-center">
          <div className="flex flex-col content-center items-center">
            <div className="hidden portrait:sm:flex pb-1">
              {nurtureCoordinates}
            </div>
            <BlogImages
              blogData={blogData}
              imgIndex={imgIndex}
              country={params.country}
            />
          </div>
          <div className="hidden landscape:block">{blogText}</div>
        </div>
      </div>
      <PostNavButtons prevBlogData={prevBlogData} nextBlogData={nextBlogData} />
      <div className="flex landscape:hidden flex-1 flex-col content-center items-center">
        {blogText}
      </div>
    </div>
  );
}
