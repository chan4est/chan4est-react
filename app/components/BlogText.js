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
    <div className="flex flex-row justify-center lg:justify-between h-[20px]">
      {/* DO NOT REMOVE! Empty div so that the dots are centered */}
      {/* <div className="hidden xl:block xl:w-10"></div> */}
      <div className="hidden lg:block lg:w-10"></div>
      <div className="pt-[0.875rem] flex flex-wrap justify-center items-center">
        {scrollSnapsList}
      </div>
      {/* <div className="hidden xl:flex xl:justify-end"> */}
      <div className="hidden lg:flex lg:justify-end">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
}

function BlogCaption({ title, paragraphs, publishDate }) {
  return (
    <ul>
      <li className="pb-3 pt-2">
        <span>
          <strong>{title}</strong>
        </span>
      </li>
      {paragraphs}
      <li className="text-blog_accent">{publishDate}</li>
    </ul>
  );
}

function ImageDescriptions({ imageDescriptions, route }) {
  let imageDescriptionsList = [];
  imageDescriptions.forEach((description, i) =>
    imageDescriptionsList.push(
      <Link
        href={`${route}?img_index=${i + 1}`}
        title={`Jump to image #${i + 1}`}
      >
        <p key={description}>{`${i + 1}. ` + description}</p>
      </Link>
    )
  );

  return <div className="pl-2">{imageDescriptionsList}</div>;
}

function WrappedTextContent({ content }) {
  return (
    <div className="flex flex-col flex-[0_0_100%]">
      <div className="">{content}</div>
    </div>
  );
}

export default function BlogText({
  title,
  paragraphs,
  publishDate,
  imageDescriptions,
  route,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const caption = (
    <BlogCaption
      title={title}
      paragraphs={paragraphs}
      publishDate={publishDate}
    />
  );

  const descriptions = (
    <ImageDescriptions imageDescriptions={imageDescriptions} route={route} />
  );

  const textReel = [
    <WrappedTextContent content={caption} key={0} />,
    <WrappedTextContent content={descriptions} key={1} />,
  ];

  return (
    <div className="overflow-hidden text-left pl-3 pr-3 pb-3 pt-[0.875rem] max-w-[450px] md:max-w-[400px] md:pt-0 md:pb-0 md:pl-7 md:pr-7 text-[0.75rem]">
      <div id="embla-carousel" className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{textReel}</div>
      </div>
      <PhotoControls emblaApi={emblaApi} />
    </div>
  );
}
