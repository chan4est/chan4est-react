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

function BlogImage({ imgSrc, imageDescription, imageNumber, country }) {
  const descHeightHackyStyle =
    country === "croatia"
      ? "flex text-center items-center justify-center h-10 sm:h-6 text-sm pt-1 pl-1 pr-1"
      : "text-sm pt-1 pl-1 pr-1";
  return (
    <div className="flex flex-col flex-[0_0_100%] text-center">
      <div className="max-w-[45rem] max-h-[45rem]">
        <Image
          src={imgSrc}
          alt={`Photo of ${imageDescription}`}
          width={1500}
          height={1500}
          title={imageDescription}
          style={{
            width: "100%",
            height: "auto",
          }}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(720, 720)
          )}`}
          priority={imageNumber == 0 ? true : false}
          unoptimized={true}
        />
      </div>
      <p className={descHeightHackyStyle}>{imageDescription}</p>
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
      title={`Jump to image #${index + 1}`}
      className={"embla__dot after:bg-button_inactive".concat(
        index === selectedIndex
          ? "embla__dot__selected after:bg-button_active"
          : ""
      )}
    />
  ));

  return (
    <div className="flex flex-row justify-center lg:justify-between pt-1 pb-2">
      {/* DO NOT REMOVE! Empty div so that the dots are centered */}
      <div className="hidden lg:block lg:w-10"></div>
      <div className="flex flex-wrap justify-center items-center">
        {scrollSnapsList}
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
export default function BlogImages({ blogData, imgIndex, country }) {
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
      className="overflow-hidden max-w-full sm:max-w-[28rem] lg:max-w-[35rem] xl:max-w-[45rem] sticky top-0 \
                    bg-accent  landscape:max-w-[268px] landscape:md:max-w-[300px] landscape:lg:max-w-[45rem]"
    >
      {/* TODO: Check what overflow-hidden is actually doing here */}
      <div id="embla-carousel" className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{imgList}</div>
      </div>
      <PhotoControls emblaApi={emblaApi} />
    </div>
  );
}
