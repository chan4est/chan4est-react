"use client";

import { useState } from "react";
import { BlogPhotoGrid } from "./BlogPhotoGrid";
import Image from "next/image";

function SortButton({ sortedData, setSortedData }) {
  const [isAscending, setIsAscending] = useState(false);

  function handleClick() {
    setIsAscending(!isAscending);
    setSortedData(sortedData.slice().reverse());
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center hover:scale-110 transition duration-200 ease-in-out"
      title={isAscending ? "Sort by first visited" : "Sort by last visited"}
    >
      {isAscending ? "↑" : "↓"}
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
          className="pl-2 h-4 sm:h-5 lg:h-6 w-auto "
          priority={true}
          unoptimized={true}
        />
      </picture>
    </button>
  );
}

export function SortableBlogPhotoGrid({ imagesData, hasLayersIco }) {
  const [sortedData, setSortedData] = useState(imagesData);

  const sortButton = (
    <SortButton sortedData={sortedData} setSortedData={setSortedData} />
  );

  return (
    <BlogPhotoGrid
      imagesData={sortedData}
      hasLayersIco={hasLayersIco}
      buttons={sortButton}
    />
  );
}