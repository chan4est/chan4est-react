import Link from "next/link";
import { blogEntries } from "@/app/lib/blogEntries";
import { notFound } from "next/navigation";
import { ImageCarousel } from "@/app/components/ImageCarousel";
import { Links } from "@/app/lib/Links";
import NurtureCoordinates from "@/app/components/NurtureCoordinates";
import Image from "next/image";
import { BlogPostNavBar } from "@/app/components/BlogPostNavBar";

export async function generateMetadata({ params, searchParams }) {
  let metadata = { title: "404 Not Found" };

  // -1 to account for 0 based indexing
  const imgIndex =
    searchParams && searchParams.img_index ? searchParams.img_index - 1 : 0;

  const blogData = blogEntries.find((blog) => blog.route === params.country);

  const imgIdxUrl =
    imgIndex && imgIndex > 0 ? `?img_index=${imgIndex + 1}` : "";
  const openGraphUrl = `/blog/${blogData.route}${imgIdxUrl}`;

  if (blogData) {
    metadata = {
      title: `Blog | ${blogData.pageTitle}`,
      description: `Blog post for ${blogData.pageTitle}`,
      openGraph: {
        title: `Blog | ${blogData.pageTitle}`,
        description: `Chandler's blog post for ${blogData.pageTitle}`,
        url: openGraphUrl,
        image: {
          url: "/",
          width: 1200,
          height: 630,
        },
        local: "en_US",
        type: "website",
      },
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
    <div className="hidden portrait:sm:block landscape:xl:block">
      {prevBlogData ? prevPostButton : ""}
      {nextBlogData ? nextPostButton : ""}
    </div>
  );
}

function BlogText({ title, paragraphs, publishDate }) {
  return (
    <div
      className="text-left max-w-[28.125rem] text-sm overflow-x-hidden pl-3 pr-3 sm:pl-0 sm:pr-0 \
     landscape:max-h-[20.625rem] landscape:max-w-[18.75rem] landscape:overflow-y-auto landscape:pl-3 landscape:pr-3 landscape:xl:mb-8  \
     landscape:lg:max-h-[45rem] landscape:lg:max-w-[25rem] landscape:lg:pl-3 landscape:xl:pl-7"
    >
      <p>
        <b>{title}</b>
      </p>
      <br />
      {paragraphs}
      <p className="text-blog_accent pb-8">{publishDate}</p>
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

  const firstImageData = blogData.postImages[blogData.previewIdx];
  const nurtureCoordinates = (
    <NurtureCoordinates
      imgLocationLat={firstImageData.coordinates.lat}
      imgLocationLong={firstImageData.coordinates.long}
      imgLocationLink={firstImageData.coordinates.link}
    />
  );

  const postNavBar = (
    <BlogPostNavBar blogBackLink={Links.BLOG} innerText={nurtureCoordinates} />
  );

  const blogParagraphs = blogData.caption.content.split("\n").map((text) => (
    <div key={text}>
      <p>{text}</p>
      <br />
    </div>
  ));

  const blogText = (
    <BlogText
      title={blogData.caption.title}
      paragraphs={blogParagraphs}
      publishDate={blogData.caption.publishDate}
    />
  );

  return (
    <>
      <div className="portrait:hidden landscape:block">{postNavBar}</div>
      <div className="bg-accent flex flex-1 flex-col landscape:justify-center landscape:items-center">
        <div className="sticky top-0 z-20 bg-accent portrait:block landscape:hidden">
          {postNavBar}
        </div>
        <PostNavButtons
          prevBlogData={nextBlogData}
          nextBlogData={prevBlogData}
        />
        <div className="landscape:flex landscape:flex-row landscape:items-center">
          <div className="flex flex-col content-center items-center">
            <div className="hidden portrait:sm:flex landscape:lg:flex pb-1">
              {nurtureCoordinates}
            </div>
            <ImageCarousel
              blogData={blogData}
              imgIndex={imgIndex}
              totalImages={blogData.postImages.length}
              country={params.country}
            />
          </div>
          <div className="hidden landscape:flex">{blogText}</div>
        </div>
        <div className="flex landscape:hidden flex-1 flex-col content-center items-center">
          {blogText}
        </div>
      </div>
    </>
  );
}
