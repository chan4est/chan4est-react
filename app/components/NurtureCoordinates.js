import Link from "next/link";

export default function NurtureCoordinates({
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
