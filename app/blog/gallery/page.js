import { blogEntries } from "../../data/blogEntries";
import { linkConstants } from "../../lib/linkConstants";
import { BlogPhotoGrid } from "../../components/BlogPhotoGrid";
import { BlogPostNavBar } from "../../components/BlogPostNavBar";
import { Footer } from "../../components/Footer";

export const metadata = {
  title: "chan4est | Travel Blog Gallery",
  description: "Gallery of all my travels around the world 🌎🌍🌏",
  openGraph: {
    title: "chan4est | Travel Blog Gallery",
    description: "Gallery for Chandler's world travel blog",
    url: "/blog/gallery",
    image: {
      url: "/",
      width: 1200,
      height: 630,
    },
    local: "en_US",
    type: "website",
  },
};

export default function BlogGallery({}) {
  const reversedBlogEntries = blogEntries.slice().reverse();

  const imagesData = reversedBlogEntries.flatMap((entry) =>
    entry.postImages.map((img, imgIdx) => ({
      ...img,
      entryTitle: img.description,
      entryRoute: linkConstants.BLOG_ROUTER_LINK(entry.route, imgIdx),
    }))
  );

  const postNavBar = (
    <BlogPostNavBar
      blogBackLink={linkConstants.BLOG}
      innerText={<p className="pt-1">Gallery</p>}
    />
  );

  return (
    <>
      <div className="portrait:hidden landscape:block">{postNavBar}</div>
      <div className="bg-background flex flex-1 flex-col text-center landscape:justify-center landscape:items-center">
        <div className="sticky top-0 z-20 bg-background portrait:block landscape:hidden">
          {postNavBar}
        </div>
        <BlogPhotoGrid imagesData={imagesData} />
      </div>
      <Footer />
    </>
  );
}
