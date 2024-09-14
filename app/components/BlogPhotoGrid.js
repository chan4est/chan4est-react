import Image from "next/image";
import Link from "next/link";
import layersIcon from "../../public/blog/layers.webp";
import { Links } from "@/app/lib/Links";
import { imgURL, r_620 } from "../lib/cloudflareImgNames";

export function GalleryGridSquare({
  imgSrc,
  imgTitle,
  entryTitle,
  entryRoute,
  hasLayersIco,
}) {
  return (
    <Link href={entryRoute} title={entryTitle}>
      <div className="relative">
        {hasLayersIco && (
          <Image
            src={layersIcon}
            alt=""
            width={50}
            height={50}
            className="absolute z-10 top-0 right-0 pt-2 pr-2 w-6 h-6 lg:w-7 lg:h-7 pointer-events-none"
            priority={true}
            unoptimized={true}
          />
        )}
        <Image
          src={imgSrc}
          alt={`Photo of ${imgTitle}`}
          width={310}
          height={310}
          className="max-h-[19.375rem] bg-background"
          priority={true}
          unoptimized={true}
        />
      </div>
    </Link>
  );
}

export function BlogPhotoGrid({ imagesData, hasLayersIco }) {
  const images = imagesData.map((imgData, index) => {
    return (
      <GalleryGridSquare
        imgSrc={imgURL(imgData.imgID, r_620)}
        imgTitle={imgData.description}
        entryTitle={imgData.entryTitle}
        entryRoute={imgData.entryRoute}
        hasLayersIco={hasLayersIco}
        key={imgData.imgID}
      />
    );
  });

  return (
    <div className="flex flex-col justify-center content-center">
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-1 p-[0.25rem] sm:gap-1 sm:p-1 md:p-9">
        {images}
      </div>
    </div>
  );
}
