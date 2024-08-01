import Link from "next/link";
import { blogEntriesSimple } from "@/app/lib/blogEntriesSimple";
import { notFound } from "next/navigation";
import { NavBar } from "@/app/components/Navbar";
import BlogImages from "@/app/components/BlogImages";

export async function generateMetadata({ params }) {
  let metadata = { title: "404 Not Found" };

  const blogData = blogEntriesSimple.find(
    (blog) => blog.route === params.country
  );

  if (blogData) {
    metadata = {
      title: `chan4est | ${blogData.pageTitle}`,
    };
  }

  return metadata;
}

export async function generateStaticParams() {
  const blogEntryRoutes = blogEntriesSimple.map((blogEntry) => ({
    country: blogEntry.route,
  }));
  return blogEntryRoutes;
}

// Shown only in smaller window widths (phones, tablets)
function BlogBackButton({}) {
  return (
    <Link
      href="/blog/"
      className="flex justify-center content-center w-9 h-9 lg:w-11 lg:h-11 xl:hidden absolute top-3 left-1"
    >
      <button>
        <svg className="h-5 w-5 lg:h-7 lg:w-7" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
          />
        </svg>
      </button>
    </Link>
  );
}

// Shown only in larger window widths (desktops)
function BlogNextPrevButtons({ prevBlogData, nextBlogData }) {
  return (
    <div className="hidden xl:block">
      {prevBlogData ? (
        <Link
          href={`/blog/${prevBlogData.route}`}
          className="fixed top-1/2 left-0 transform -translate-y-1/2 z-10 pl-5"
          title={prevBlogData.pageTitle}
        >
          <button>
            <svg className="h-7 w-7" viewBox="0 0 532 532">
              <path
                fill="currentColor"
                d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
              />
            </svg>
          </button>
        </Link>
      ) : (
        ""
      )}
      {nextBlogData ? (
        <Link
          href={`/blog/${nextBlogData.route}`}
          className="fixed top-1/2 right-0 transform -translate-y-1/2 z-10 pr-5"
          title={nextBlogData.pageTitle}
        >
          <button>
            <svg
              className="h-7 w-7"
              viewBox="0 0 532 532"
              transform="scale(-1 1)"
            >
              <path
                fill="currentColor"
                d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
              />
            </svg>
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}

export default function BlogPage({ params, searchParams }) {
  const blogData = blogEntriesSimple.find(
    (blog) => blog.route === params.country
  );

  // Bogus route
  if (!blogData) {
    return notFound();
  }

  // -1 to account for 0 based indexing
  const imgIndex =
    searchParams && searchParams.img_index ? searchParams.img_index - 1 : 0;

  // For the previous and next blog post buttons
  const blogDataIndex = blogEntriesSimple.findIndex(
    (blog) => blog.route === params.country
  );
  const prevBlogData =
    blogDataIndex > 0 ? blogEntriesSimple[blogDataIndex - 1] : null;
  const nextBlogData =
    blogDataIndex < blogEntriesSimple.length - 1
      ? blogEntriesSimple[blogDataIndex + 1]
      : null;

  const blogParagraphs = blogData.caption.content.split("\n").map((text) => (
    <li className="pb-2" key={text}>
      {text}
    </li>
  ));

  return (
    <div className="bg-accent flex flex-1 flex-col">
      <BlogNextPrevButtons
        prevBlogData={prevBlogData}
        nextBlogData={nextBlogData}
      />
      <div className="flex flex-row justify-center items-center pb-4 xl:pb-0">
        <div id="topnavbar">
          <NavBar />
          <BlogBackButton />
        </div>
      </div>
      <div className="flex flex-1 flex-col md:flex-row content-center lg:justify-center items-center md:pt-8 pb-8 md:pl-7">
        <BlogImages blogData={blogData} imgIndex={imgIndex} />
        <div className="text-left pl-3 pr-3 pb-3 pt-1 max-w-[450px] md:max-w-[400px] md:pt-0 md:pb-0 md:pl-7 md:pr-7 text-[0.75rem]">
          <ul>
            <li className="pb-3 pt-2">
              <span>
                <strong>{blogData.caption.title}</strong>
                {/* <span className="pl-1 drop-shadow-md">{blogData.flags[0]}</span> */}
              </span>
            </li>
            {blogParagraphs}
            <li className="text-blog_accent">{blogData.caption.publishDate}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
