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
      className="flex items-center justify-center hover:scale-110 transition duration-200 ease-in-out text-xl"
      title={isSortedByFirst ? "Sort by last visited" : "Sort by first visited"}
    >
      {isSortedByFirst ? "↑" : "↓"}
      {/* {isSortedByFirst ? "Oldest ↑" : "Newest ↓"} */}
      {/* <picture>
        <source
          srcSet={`/header-icons/grid-w.webp`}
          media="(prefers-color-scheme: dark)"
        />
        <Image
          src={`/header-icons/grid.webp`}
          alt="Gallery icon"
          width={50}
          height={50}
          className="pl-2 h-4 sm:h-5 lg:h-6 w-auto "
          priority={true}
          unoptimized={true}
        />
      </picture> */}
    </button>
  );
}

function GalleryLink({}) {
  return (
    <Link
      href={linkConstants.BLOG_GALLERY}
      title="Gallery"
      className="hover:scale-110 transition duration-200 ease-in-out flex flex-row items-center justify-center text-center"
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
          className="pr-1 h-4 sm:h-5 lg:h-6 w-auto "
          priority={true}
          unoptimized={true}
        />
      </picture>
      {/* {"Gallery"} */}
    </Link>
  );
}

export function SortableBlogPhotoGrid({ imagesData, hasLayersIco }) {
  const [sortedData, setSortedData] = useState(imagesData);

  const buttons = (
    <div className="flex justify-center items-center">
      <SortButton sortedData={sortedData} setSortedData={setSortedData} />
      <p className="px-2">|</p>
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
