"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { blogEntriesSimple } from "@/app/lib/blogEntriesSimple";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/app/components/EmblaCarouselArrowButtons";
import {
  DotButton,
  useDotButton,
} from "@/app/components/EmblaCarouselDotbutton";
import Link from "next/link";
import { useSearchParams, notFound } from "next/navigation";
import { NavBar } from "@/app/components/Navbar";

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

function NurtureCoordinates({
  imgLocationLat,
  imgLocationLong,
  imgLocationLink,
}) {
  const latComponents = imgLocationLat.split("°");
  const latComponents2 = latComponents[1].split("'");
  const latComponents3 = latComponents2[1].split('"');

  const longComponents = imgLocationLong.split("°");
  const longComponents2 = longComponents[1].split("'");
  const longComponents3 = longComponents2[1].split('"');

  return (
    <Link
      href={imgLocationLink}
      className="text-sm hover:text-button_inactive pl-3 pr-3 pb-1"
    >
      <p>
        <span>{`Φ `}</span>
        <span className="pl-2">{`${latComponents[0]}°`}</span>
        <span className="pl-2">{`${latComponents2[0]}'`}</span>
        <span className="pl-1">{`${latComponents3[0]}"`}</span>
        <sup className="pl-2">
          <i>{`(${latComponents3[1]})`}</i>
        </sup>
        <span className="pl-4 pr-4">{" | "}</span>
        <span>{`λ `}</span>
        <span className="pl-2">{`${longComponents[0]}°`}</span>
        <span className="pl-2">{`${longComponents2[0]}'`}</span>
        <span className="pl-1">{`${longComponents3[0]}"`}</span>
        <sup className="pl-2">
          <i>{`(${longComponents3[1]})`}</i>
        </sup>
      </p>
    </Link>
  );
}

function BlogImage({
  imgSrc,
  imgLocationName,
  imgLocationLat,
  imgLocationLong,
  imgLocationLink,
  imageNumber,
}) {
  return (
    <div className="flex flex-col flex-[0_0_100%] items-center justify-center">
      <NurtureCoordinates
        imgLocationLat={imgLocationLat}
        imgLocationLong={imgLocationLong}
        imgLocationLink={imgLocationLink}
      />
      <div className="max-w-[720px] max-h-[720px]">
        <Image
          src={imgSrc}
          alt={`Photo of ${imgLocationName}`}
          width={5000}
          height={5000}
          quality={25}
          title={imgLocationName}
          style={{
            width: "100%",
            height: "auto",
          }}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(750, 750)
          )}`}
          priority={imageNumber == 0 ? true : false}
          loading={"eager"}
          // unoptimized={true}
        />
      </div>
    </div>
  );
}

function PhotoControls({ emblaApi }) {
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const scrollSnapsList = scrollSnaps.map((_, index) => (
    <DotButton
      key={index}
      onClick={() => onDotButtonClick(index)}
      className={"embla__dot after:bg-button_inactive".concat(
        index === selectedIndex
          ? "embla__dot__selected after:bg-button_active"
          : ""
      )}
    />
  ));

  return (
    <div className="flex flex-row justify-center xl:justify-between">
      {/* DO NOT REMOVE! Empty div so that the dots are centered */}
      <div className="hidden xl:block xl:w-10"></div>
      <div className="pt-[0.875rem] flex flex-wrap justify-center items-center">
        {scrollSnapsList}
      </div>
      <div className="hidden xl:flex xl:justify-end">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
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
          title={prevBlogData.title}
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
          title={nextBlogData.title}
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

export default function BlogPage({ params }) {
  const searchParams = useSearchParams();
  const imgIndex = searchParams.get("index");
  // -1 to account for 0 based indexing
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: imgIndex - 1 });

  const blogData = blogEntriesSimple.filter(
    (blog) => blog.route === params.country
  )[0];

  if (!blogData) {
    return notFound();
  }

  const blogDataIndex = blogEntriesSimple.findIndex(
    (blog) => blog.route === params.country
  );
  const prevBlogData =
    blogDataIndex > 0 ? blogEntriesSimple[blogDataIndex - 1] : null;
  const nextBlogData =
    blogDataIndex < blogEntriesSimple.length - 1
      ? blogEntriesSimple[blogDataIndex + 1]
      : null;

  const blogParagraphs = blogData.text.split("\n").map((text) => (
    <li className="pb-2" key={text}>
      {text}
    </li>
  ));

  const imgList = blogData.images.map((imgData, i) => (
    <BlogImage
      imgSrc={imgData.src}
      imgLocationName={imgData.location.description}
      imgLocationLat={imgData.location.coordinates.lat}
      imgLocationLong={imgData.location.coordinates.long}
      imgLocationLink={imgData.location.coordinates.link}
      imageNumber={i}
      key={i}
    />
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
        <div className="overflow-hidden max-w-full lg:max-w-[720px] ">
          <div id="embla-carousel" className="overflow-hidden" ref={emblaRef}>
            <div className="flex">{imgList}</div>
          </div>
          <PhotoControls emblaApi={emblaApi} />
        </div>

        <div className="text-left pl-3 pr-3 pb-3 pt-1 max-w-[450px] md:max-w-[400px] md:pt-0 md:pb-0 md:pl-7 md:pr-7 text-[0.75rem]">
          <ul>
            <li className="pb-3 pt-2">
              <span>
                <strong>{blogData.title}</strong>
                <span className="pl-1 drop-shadow-md">{blogData.flag}</span>
              </span>
            </li>
            {blogParagraphs}
            <li className="text-blog_accent">{blogData.date}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
