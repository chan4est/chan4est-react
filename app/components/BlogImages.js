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
  imgFullResLink,
  imgLocationName,
  imgLocationLat,
  imgLocationLong,
  imgLocationLink,
  imageNumber,
}) {
  return (
    <div className="flex flex-col flex-[0_0_100%] text-center">
      <NurtureCoordinates
        imgLocationLat={imgLocationLat}
        imgLocationLong={imgLocationLong}
        imgLocationLink={imgLocationLink}
      />
      <div className="max-w-[720px] max-h-[720px]">
        <Link href={imgFullResLink}>
          <Image
            src={imgSrc}
            alt={`Photo of ${imgLocationName}`}
            width={720}
            height={720}
            quality={100}
            title={imgLocationName}
            style={{
              width: "100%",
              height: "auto",
            }}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(750, 750)
            )}`}
            priority={imageNumber == 0 ? true : false}
            loading={imageNumber == 0 ? "eager" : "lazy"}
            // unoptimized={true}
          />
        </Link>
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
    <div className="flex flex-row justify-center xl:justify-between h-[20px]">
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
export default function BlogImages({ blogData, imgIndex }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: imgIndex });

  const imgList = blogData.postImages.map((imgData, i) => (
    <BlogImage
      imgSrc={imgData.src_720}
      imgFullResLink={imgData.src_full}
      imgLocationName={imgData.description}
      imgLocationLat={imgData.coordinates.lat}
      imgLocationLong={imgData.coordinates.long}
      imgLocationLink={imgData.coordinates.link}
      imageNumber={i}
      key={i}
    />
  ));

  return (
    <div className="overflow-hidden max-w-full lg:max-w-[720px] ">
      <div id="embla-carousel" className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{imgList}</div>
      </div>
      <PhotoControls emblaApi={emblaApi} />
    </div>
  );
}
