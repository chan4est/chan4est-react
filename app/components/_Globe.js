"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { blogEntriesOld } from "../lib/blogEntriesOld";
import { globeArcsData } from "../lib/globeArcsData";

export default function _Globe() {
  const [globeCenter, setGlobeCenter] = useState({
    lat: 25,
    lng: 90,
    altitude: 3,
    axis: 45,
  });

  const globeEl = useRef(null);

  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 1.25;
    globeEl.current.pointOfView(globeCenter);
    // globeEl.current.controls().enableZoom = false;
  }, [globeCenter]);

  let htmlPins = [];
  blogEntriesOld.forEach((entry) => {
    if (entry.coordinates) {
      entry.coordinates.forEach((coordinate_pair) => {
        htmlPins.push({
          lat: coordinate_pair[0],
          lng: coordinate_pair[1],
          size: "10",
          label: entry.title,
        });
      });
    }
  });

  // Arc Dash Lengths
  const planeDashLength = 1.5;
  const trainDashLength = 0.25;

  // Arc Altitudes
  const startEndTripFlightArcAltitude = 0.25;
  const middleTripFlightArcAltitude = 0.05;
  const trainArcAltitude = 0.0005;

  // Arc Dash Gaps
  const startEndTripDashGap = 1;
  const middleTripDashGap = 0.5;

  let arcsData = [];
  for (const continent in globeArcsData) {
    const colors = globeArcsData[`${continent}`].colors;
    const dataSet = globeArcsData[`${continent}`].data;
    let firstEntry = null;
    let prevEntry = null;
    for (let i = 0; i <= dataSet.length; i++) {
      let data = null;
      if (i == dataSet.length) {
        data = firstEntry;
      } else {
        data = dataSet[i];
      }
      if (i == 0) {
        firstEntry = data;
      } else {
        let _altitude = trainArcAltitude;
        let _dashGap = middleTripDashGap;
        if (i == 1 || i == dataSet.length) {
          _altitude = startEndTripFlightArcAltitude;
          _dashGap = startEndTripDashGap;
        } else if (prevEntry.specialLeg) {
          _altitude = startEndTripFlightArcAltitude;
        } else if (prevEntry.exitedVia == "plane") {
          _altitude = middleTripFlightArcAltitude;
          _dashGap = middleTripDashGap;
        }
        const arcData = {
          startLat: prevEntry.coordinates[0],
          startLng: prevEntry.coordinates[1],
          endLat: data.coordinates[0],
          endLng: data.coordinates[1],
          color: colors,
          dashLength:
            prevEntry.exitedVia == "plane" ? planeDashLength : trainDashLength,
          altitude: _altitude,
          dashGap: _dashGap,
        };
        arcsData.push(arcData);
      }
      prevEntry = data;
    }
  }

  return (
    <Globe
      ref={globeEl}
      // backgroundImageUrl="/blog/globe/stars.jpeg"
      backgroundColor="rgba(0,0,0,0)"
      htmlElementsData={htmlPins}
      htmlElement={(d) => {
        const el = document.createElement("div");
        el.innerHTML = `<img src='/blog/globe/circle.png'></img>`;
        el.style.color = d.color;
        el.style.width = `${d.size}px`;

        el.style["pointer-events"] = "auto";
        el.style.cursor = "pointer";
        el.onclick = () => {
          // globeEl.current.pointOfView({ lat: d.lat, lng: d.lng }, 750);
          // globeEl.current.controls().autoRotate = false;
          // el.style.width = "500px";
          // el.style.height = "500px";
          // el.innerHTML = d.label;
        };
        el.onhover = () => {
          el.innerHTML = el.innerHTML + `<p>${d.label}</p>`;
        };
        return el;
      }}
      pointOfView={{ lat: 50.073658, lng: 14.41854 }}
      globeImageUrl="/blog/globe/map3.jpg"
      showAtmosphere={false}
      showGraticules={true}
      arcsData={arcsData}
      arcColor={"color"}
      arcDashLength={"dashLength"}
      arcAltitude={"altitude"}
      arcDashGap={"dashGap"}
      arcDashAnimateTime={1000}
    />
  );
}
