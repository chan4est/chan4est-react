"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/app/components/EmblaCarouselArrowButtons";
import {
  DotButton,
  useDotButton,
} from "@/app/components/EmblaCarouselDotbutton";
import { shimmer, toBase64 } from "@/app/lib/shimmer";
import { imgURL, r_720, r_1500, r_3000 } from "../lib/cloudflareImgNames";
import Link from "next/link";
import { useEffect } from "react";
import { linkConstants } from "../lib/linkConstants";

function BlogImage({ imgSrc, imageDescription, imageNumber, country }) {
  return (
    <div className="flex flex-col flex-[0_0_100%] text-center">
      <Link
        className="max-w-[45rem] max-h-[45rem]"
        // https://www.youtube.com/watch?v=P4W_LaotmNI
        href={linkConstants.BLOG_ROUTER_LINK(country, imageNumber)}
      >
        <Image
          src={imgSrc}
          alt={`Photo of ${imageDescription}`}
          width={1500}
          height={1500}
          title={imageDescription}
          className="w-full h-auto bg-img_bg"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(720, 720)
          )}`}
          priority={imageNumber == 0 ? true : false}
          unoptimized={true}
        />
      </Link>
      <p className="text-xs pt-1 pl-1 pr-1">{imageDescription}</p>
    </div>
  );
}

function PhotoControls({ emblaApi, country, totalImages }) {
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const scrollSnapsList = Array.from({ length: totalImages }, (_, index) => (
    <DotButton
      key={index}
      onClick={() => onDotButtonClick(index)}
      title={`Jump to image #${index + 1}`}
      className={"embla__dot after:bg-button_inactive".concat(
        index === selectedIndex
          ? "embla__dot__selected after:bg-button_active after:transition after:ease-in-out after:duration-200"
          : ""
      )}
    />
  ));

  // https://github.com/vercel/next.js/discussions/49540#discussioncomment-8852218
  // https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating#shallow-routing
  useEffect(() => {
    const currentUrl = linkConstants.BLOG_ROUTER_LINK(country, selectedIndex);
    window.history.pushState(null, "", currentUrl);
  }, [country, selectedIndex]);

  return (
    <div className="flex flex-row justify-center lg:justify-between pt-2 pb-3">
      {/* DO NOT REMOVE! Empty div so that the dots are centered */}
      <div className="hidden lg:block lg:w-10"></div>
      <div className="flex flex-wrap justify-center items-center">
        <p className="text-xs w-9 text-right pr-2">
          {selectedIndex + 1}/{totalImages}
        </p>
        {scrollSnapsList}
        <div className="flex items-center justify-left pl-2 w-9">
          <Link href={`/blog/${country}/gallery`} title="Gallery">
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
                className="h-4 w-auto hover:scale-110 transition duration-200 ease-in-out"
                priority={true}
                unoptimized={true}
              />
            </picture>
          </Link>
        </div>
      </div>
      <div className="hidden lg:flex justify-end items-center gap-x-2">
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          title="Previous image"
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          title="Next image"
        />
      </div>
    </div>
  );
}
export function ImageCarousel({ blogData, imgIndex, totalImages, country }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: imgIndex });

  const imgList = blogData.postImages.map((imgData, i) => (
    <BlogImage
      imgSrc={imgURL(imgData.imgID, r_1500)}
      imageDescription={imgData.description}
      imageNumber={i}
      country={country}
      key={i}
    />
  ));

  return (
    <div
      className="bg-background overflow-hidden sticky top-0 max-w-full sm:max-w-[28rem] lg:max-w-[35rem] xl:max-w-[45rem]  \
                landscape:max-w-[16.75rem] landscape:md:max-w-[18.75rem] landscape:lg:max-w-[40.625rem] landscape:xl:max-w-[45rem] landscape:pl-3"
    >
      {/* TODO: Check what overflow-hidden is actually doing here */}
      <div id="embla-carousel" className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{imgList}</div>
      </div>
      <PhotoControls
        emblaApi={emblaApi}
        country={country}
        // To prevent CLS
        totalImages={totalImages}
      />
    </div>
  );
}
