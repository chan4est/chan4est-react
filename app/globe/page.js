"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { blogEntriesOld } from "../lib/blogEntriesOld";

const Globe = dynamic(
  () => import("../components/_Globe").then((mod) => mod.default),
  {
    ssr: false,
    // loading: () => <h5>Loading the world 🌎🌍🌏</h5>,
  }
);

export default function MapChart() {
  return (
    <div className="flex max-w-screen min-h-screen flex-col text-center content-center justify-center items-center">
      <Globe />
    </div>
  );
}
