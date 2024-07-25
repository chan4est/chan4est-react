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
import { NavBar } from "@/app/components/Navbar";

function BlogImage({ imgSrc, imgLocation }) {
  return (
    <div className="flex-[0_0_100%] min-w-0 flex items-center justify-center flex-shrink-0">
      <Image
        src={imgSrc}
        alt={`Photo of ${imgLocation}`}
        width={720}
        height={720}
        quality={100}
      />
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

export default function BlogPage({ params }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const blogData = blogEntriesSimple.filter(
    (blog) => blog.route === params.country
  )[0];

  const blogParagraphs = blogData.text.split("\n").map((text) => (
    <li className="pb-2" key={text}>
      {text}
    </li>
  ));

  const imgList = blogData.galleryLinks.map((link, i) => (
    <BlogImage
      imgSrc={link}
      imgLocation={blogData.location}
      key={`${link}${i}`}
    />
  ));

  return (
    // <div className="bg-accent flex flex-1">
    //   <div className="pt-2 pb-2 h-20">
    //     <NavBar />
    //     <Link
    //       href="/blog/"
    //       className="flex justify-center content-center w-9 h-9 lg:w-11 lg:h-11 absolute top-3 left-2"
    //     >
    //       <button>
    //         <svg className="h-5 w-5" viewBox="0 0 532 532">
    //           <path
    //             fill="currentColor"
    //             d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
    //           />
    //         </svg>
    //       </button>
    //     </Link>
    //   </div>
    <div className="bg-accent flex flex-1 flex-col md:flex-row content-center lg:justify-center items-center md:pt-8 pb-8 md:pl-7">
      <div className="overflow-hidden max-w-[720px] md:max-w[400px] lg:max-w-[720px]">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">{imgList}</div>
          <PhotoControls emblaApi={emblaApi} />
        </div>
      </div>

      <div className="text-left pl-3 pr-3 pb-3 pt-1 max-w-[450px] md:max-w-[400px] md:pt-0 md:pb-0 md:pl-7 md:pr-7 text-[0.75rem]">
        <ul>
          <li className="pb-3">{blogData.title}</li>
          {blogParagraphs}
          <li className="text-blog_accent">{blogData.date}</li>
        </ul>
      </div>
    </div>
    // </div>
  );
}
