"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { blogEntriesSimple } from "@/app/lib/blogEntriesSimple";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/app/lib/EmblaCarouselArrowButtons";
import useWindowSize from "@/app/lib/useWindowSize";
import { DotButton, useDotButton } from "@/app/lib/EmblaCarouselDotbutton";

function BlogImage({ imgSrc, imgLocation }) {
  return (
    <div className="embla__slide flex items-center justify-center flex-shrink-0 md:w-[600px] md:h-[600px] lg:w-[720px] lg:h-[720px]">
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

export default function BlogPage({ params }) {
  const { height, width } = useWindowSize();
  // const dragable = width < 1080 ? true : false;

  const blogEntries = blogEntriesSimple;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    // watchDrag: dragable,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const blogData = blogEntries.filter(
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
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row content-center lg:justify-center items-center text-[12px]">
      <div className="embla max-w-[720px] md:max-w[400px] lg:max-w-[720px]">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">{imgList}</div>
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
          <div className="hidden xl:flex xl:justify-end">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </div>

      <div className="text-left pl-3 pr-3 pb-3 max-w-[450px] md:max-w-[400px] md:pl-7 md:pr-7">
        <ul>
          <li className="pb-3">{blogData.title}</li>
          {blogParagraphs}
          <li className="text-blog_accent">{blogData.date}</li>
        </ul>
      </div>
    </div>
  );
}
