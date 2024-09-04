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
import Link from "next/link";
import { shimmer, toBase64 } from "@/app/lib/shimmer";
import { imgURL, r_720, r_1500, r_3000 } from "../lib/cloudflareImgNames";

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
      className="text-sm hover:text-button_inactive pl-3 pr-3 pb-1 pt-[0.375rem]"
      title="Coordinates"
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
  imgFullResLink,
  imageDescription,
  imgLocationLat,
  imgLocationLong,
  imgLocationLink,
  imageNumber,
  country,
}) {
  const descHeightHackyStyle =
    country === "croatia"
      ? "flex text-center items-center justify-center h-10 sm:h-6 text-sm pt-1 pl-1 pr-1"
      : "text-sm pt-1 pl-1 pr-1";
  return (
    <div className="flex flex-col flex-[0_0_100%] text-center">
      <NurtureCoordinates
        imgLocationLat={imgLocationLat}
        imgLocationLong={imgLocationLong}
        imgLocationLink={imgLocationLink}
      />
      <div className="max-w-[45rem] max-h-[45rem]">
        <Link href={imgFullResLink}>
          <Image
            src={imgSrc}
            alt={`Photo of ${imageDescription}`}
            width={1500}
            height={1500}
            quality={100}
            title={imageDescription}
            style={{
              width: "100%",
              height: "auto",
            }}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(720, 720)
            )}`}
            priority={
              imageNumber == 0 || imageNumber == 1 || imageNumber == 2
                ? true
                : false
            }
            // priority={true}
            loading={"eager"}
            // loading={imageNumber == 0 ? "eager" : "lazy"}
            // unoptimized={false}
            unoptimized={true}
          />
        </Link>
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
    <div className="flex flex-row justify-center lg:justify-between h-[1.25rem]">
      {/* DO NOT REMOVE! Empty div so that the dots are centered */}
      <div className="hidden lg:block lg:w-10"></div>
      <div className="flex flex-wrap justify-center items-center">
        {scrollSnapsList}
      </div>
      <div className="hidden lg:flex lg:justify-end">
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          title="Next image"
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          title="Previous image"
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
      imgFullResLink={imgURL(imgData.imgID, r_3000)}
      imageDescription={imgData.description}
      imgLocationLat={imgData.coordinates.lat}
      imgLocationLong={imgData.coordinates.long}
      imgLocationLink={imgData.coordinates.link}
      imageNumber={i}
      country={country}
      key={i}
    />
  ));

  return (
    <div className="overflow-hidden max-w-full lg:max-w-[45rem] sticky top-0 bg-accent">
      {/* TODO: Check what overflow-hidden is actually doing here */}
      <div id="embla-carousel" className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{imgList}</div>
      </div>
      <PhotoControls emblaApi={emblaApi} />
    </div>
  );
}
