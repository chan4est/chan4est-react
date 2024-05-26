"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

export default function _Globe() {
  const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

  const [globeCenter, setGlobeCenter] = useState({
    lat: 0,
    lng: 0,
    altitude: 2,
  });

  const [landPolygons, setLandPolygons] = useState([]);
  const globeEl = useRef(null);

  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.25;
    globeEl.current.pointOfView(globeCenter);
    globeEl.current.controls().enableZoom = false;
  }, [globeCenter]);

  // useEffect(() => {
  //   console.log("REF", globeEl);
  // }, [globeEl]);

  return (
    <Globe
      // height={500}
      ref={globeEl}
      backgroundImageUrl="/blog/globe/stars.jpeg"
      backgroundColor="rgba(0,0,0,0)"
      htmlElementsData={
        [
          // {
          //   lat: "50.0875",
          //   lng: "14.42138",
          //   color: "red",
          //   size: "25",
          //   label: "Prague, Czech Republic 🇨🇿",
          // },
        ]
      }
      htmlElement={(d) => {
        const el = document.createElement("div");
        el.innerHTML = markerSvg;
        el.style.color = d.color;
        el.style.width = `${d.size}px`;

        el.style["pointer-events"] = "auto";
        el.style.cursor = "pointer";
        el.onclick = () =>
          globeEl.current.pointOfView({ lat: d.lat, lng: d.lng }, 750);
        return el;
      }}
      pointOfView={{ lat: 50.073658, lng: 14.41854 }}
      globeImageUrl="/blog/globe/blue-marble.jpg"
    />
  );
}
