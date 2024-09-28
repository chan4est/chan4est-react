"use client";

import { useState } from "react";
import { BlogPhotoGrid } from "./BlogPhotoGrid";
import Image from "next/image";
import { linkConstants } from "../lib/linkConstants";
import Link from "next/link";

function SortButton({ sortedData, setSortedData }) {
  const [isSortedByFirst, setIsSortedByFirst] = useState(false);

  function handleClick() {
    setIsSortedByFirst(!isSortedByFirst);
    setSortedData(sortedData.slice().reverse());
  }

  return (
    <button
      onClick={handleClick}
      className="hover:scale-110 transition duration-200 ease-in-out h-4 sm:h-5 lg:h-6 w-4 sm:w-5 lg:w-6 \
                  flex items-center justify-end text-sm sm:text-xl lg:text-xl"
      title={isSortedByFirst ? "Sort by last visited" : "Sort by first visited"}
    >
      {isSortedByFirst ? "↑" : "↓"}
    </button>
  );
}

function GalleryLink({}) {
  return (
    <Link
      href={linkConstants.BLOG_GALLERY}
      title="Gallery"
      className="hover:scale-110 transition duration-200 ease-in-out"
    >
      <picture>
        <source
          srcSet={`/header-icons/grid-w.webp`}
          media="(prefers-color-scheme: dark)"
        />
        <Image
          src={`/header-icons/grid.webp`}
          alt="Gallery icon"
          width={50}
          height={50}
          className="h-4 sm:h-5 lg:h-6 w-auto"
          priority={true}
          unoptimized={true}
        />
      </picture>
    </Link>
  );
}

export function SortableBlogPhotoGrid({ imagesData, hasLayersIco }) {
  const [sortedData, setSortedData] = useState(imagesData);

  const buttons = (
    <div className="flex justify-center items-center">
      <SortButton sortedData={sortedData} setSortedData={setSortedData} />
      <p className="pl-2 pr-2 select-none text-sm sm:text-base">|</p>
      <GalleryLink />
    </div>
  );

  return (
    <BlogPhotoGrid
      imagesData={sortedData}
      hasLayersIco={hasLayersIco}
      hasDesc={false}
      buttons={buttons}
    />
  );
}
