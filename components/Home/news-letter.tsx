"use client";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const NewLetter = () => {
  const headingRef = useRef<HTMLImageElement>(null);
  const mainContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(headingRef.current, {
      rotateX: "0deg",
      scrollTrigger: {
        trigger: mainContainer.current,
        start: "0% 20%",
        end: "100% 60%",
        scrub: 1,
        // markers: true,
      },
    });
  });

  return (
    <section
      className="relative h-[50vh] mt-12 flex items-center justify-center overflow-hidden"
      ref={mainContainer}
    >
      <Image
        ref={headingRef}
        src={"/images/pc/logo.png"}
        alt=""
        width={1000}
        height={1000}
        className="h-[140vw] w-full object-cover dark:invert custom-heading"
      />
      <div className="container mx-auto absolute rounded-t-lg h-full bg-black/50 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center gap-5">
        <h1 className="uppercase text-center text-xl font-semibold">
          Subscribe to newsletter
        </h1>
        <form action="">
          <div className="flex border h-16 rounded-full items-center px-5">
            <input
              type="email"
              placeholder="enter your email"
              className="bg-transparent border-none outline-none h-full px-2"
            />
            <Button>
              <Send />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewLetter;
