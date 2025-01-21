/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const Slider = () => {
  const imgRefOne = useRef<HTMLDivElement>(null);
  const imgRefTwo = useRef<HTMLDivElement>(null);
  const imgRefThree = useRef<HTMLDivElement>(null);
  const imgRefFour = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "0% 0%",
          end: "200% 0%",
          scrub: 2,
          pin: true,
          // markers: true,
        },
      });
      timeline.to(
        imgRefOne.current,
        {
          top: "0%",
        },
        "a"
      );
      timeline.to(
        imgRefTwo.current,
        {
          top: "100%",
        },
        "a"
      );
      timeline.to(
        imgRefThree.current,
        {
          top: "-100%",
        },
        "a"
      );
      timeline.to(
        imgRefFour.current,
        {
          top: "0",
        },
        "a"
      );
    });
  });

  return (
    <section className="min-h-screen">
      <div className="flex flex-col lg:flex-row" ref={mainRef}>
        <div className="h-[50vh] w-full lg:h-screen lg:w-2/4 relative overflow-hidden">
          <div
            className="h-full w-full lg:bg-[url(/images/pc/4.jpg)] xl:bg-[url(/images/pc/s1.jpg)] bg-no-repeat bg-cover bg-center absolute -top-full"
            ref={imgRefOne}
          >
            <Link
              href={"/products/T-shirt"}
              className="absolute z-10 text-white w-full bottom-5 px-2"
            >
              <Button className="w-full">Shop Now</Button>
            </Link>
          </div>
          <div
            className="h-full w-full bg-[url(/images/mobile/1.jpg)] lg:bg-[url(/images/pc/1.jpg)] xl:bg-[url(/images/pc/w3.jpg)] bg-no-repeat bg-cover bg- absolute"
            ref={imgRefTwo}
          >
            <Link
              href={"/products/Hoodie"}
              className="absolute z-10 text-white w-full bottom-5 px-2"
            >
              <Button className="w-full">Shop Now</Button>
            </Link>
          </div>
        </div>

        <div className="h-[50vh] w-full lg:h-screen lg:w-2/4 overflow-hidden relative">
          <div
            className="h-full w-full bg-[url(/images/mobile/2.jpg)] lg:bg-[url(/images/pc/2.jpg)] xl:bg-[url(/images/pc/w4.jpg)] bg-no-repeat bg-cover bg-top absolute"
            ref={imgRefThree}
          >
            <Link
              href={"/products/Hoodie"}
              className="absolute z-10 text-white w-full bottom-5 px-2"
            >
              <Button className="w-full">Shop Now</Button>
            </Link>
          </div>
          <div
            className="h-full w-full lg:bg-[url(/images/pc/3.jpg)] xl:bg-[url(/images/pc/s2.jpg)] bg-no-repeat bg-cover bg-center absolute top-full"
            ref={imgRefFour}
          >
            <Link
              href={"/products/Jeans"}
              className="absolute z-10 text-white w-full bottom-5 px-2"
            >
              <Button className="w-full">Shop Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
