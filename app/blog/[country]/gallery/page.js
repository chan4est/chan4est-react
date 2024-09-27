import { notFound } from "next/navigation";
import { Links } from "@/app/lib/Links";
import { BlogPhotoGrid } from "@/app/components/BlogPhotoGrid";
import { BlogPostNavBar } from "@/app/components/BlogPostNavBar";

import { blogEntries } from "@/app/lib/blogEntries";

export async function generateMetadata({ params }) {
  let metadata = { title: "404 Not Found" };
  const blogData = blogEntries.find((blog) => blog.route === params.country);

  if (blogData) {
    metadata = {
      title: `Gallery | ${blogData.pageTitle} `,
      description: `Gallery for ${blogData.pageTitle}`,
      openGraph: {
        title: `Gallery | ${blogData.pageTitle}`,
        description: `Image gallery for ${blogData.pageTitle}`,
        url: `/blog/${blogData.route}/gallery`,
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

export default function BlogPage({ params, searchParams }) {
  const blogData = blogEntries.find((blog) => blog.route === params.country);

  // Bogus route
  if (!blogData) {
    return notFound();
  }

  const imagesData = blogData.postImages.map((img, imgIdx) => ({
    ...img,
    entryTitle: blogData.pageTitle,
    entryRoute: Links.BLOG_ROUTER_LINK(blogData.route, imgIdx),
  }));

  const postNavBar = (
    <BlogPostNavBar
      blogBackLink={Links.BLOG_BACK_LINK(params.country)}
      innerText={<p className="pt-1">Gallery</p>}
    />
  );

  return (
    <>
      <div className="portrait:hidden landscape:block">{postNavBar}</div>
      <div className="bg-background flex flex-1 flex-col landscape:justify-center landscape:items-center">
        <div className="sticky top-0 z-20 bg-background portrait:block landscape:hidden">
          {postNavBar}
        </div>
        <BlogPhotoGrid imagesData={imagesData} hasDesc={true} />
      </div>
    </>
  );
}
