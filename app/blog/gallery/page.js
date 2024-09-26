import { BlogPhotoGrid } from "@/app/components/BlogPhotoGrid";
import { Links } from "@/app/lib/Links";
import { Footer } from "@/app/components/Footer";

import { blogEntries } from "@/app/lib/blogEntries";

export async function generateMetadata({ params }) {
  const metadata = {
    title: `Blog | Gallery `,
  };
  return metadata;
}

export default function BlogGallery({}) {
  const reversedBlogEntries = blogEntries.slice().reverse();

  const imagesData = reversedBlogEntries.flatMap((entry) =>
    entry.postImages.map((img, imgIdx) => ({
      ...img,
      entryTitle: img.description,
      entryRoute: Links.BLOG_ROUTER_LINK(entry.route, imgIdx),
    }))
  );

  return (
    <>
      <div className="bg-background flex flex-1 flex-col text-center content-center items-center">
        <BlogPhotoGrid imagesData={imagesData} />
      </div>
      <Footer />
    </>
  );
}
