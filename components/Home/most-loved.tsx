import React from "react";
import { Goldman } from "next/font/google";

//components imports
import SlideShow from "@/components/slideshow/slide-show";

const goldMan = Goldman({
  weight: "700",
  subsets: ["latin"],
});

const MostLoved = () => {
  return (
    <section className="min-h-screen w-full relative mt-24">
      <h1
        className={`text-white absolute z-20 mt-24 w-full text-center font-semibold text-xl md:text-3xl xl:text-6xl uppercase ${goldMan.className}`}
      >
        Freaks Loves The Most
      </h1>
      <SlideShow />
    </section>
  );
};

export default MostLoved;
