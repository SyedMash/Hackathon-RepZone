"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./slide-style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SlideContent from "./slide-content";
import { products } from "@/constants";

export default function SlideShow() {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        (1 - progress).toString()
      );
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-screen w-full"
      >
        {products.map((product, idx: number) => (
          <SwiperSlide key={idx}>
            <SlideContent
              title={product.title}
              description={product.description}
              imageUrl={product.imageUrl}
              slug={product.slug}
              href={product.href}
            />
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20" stroke="black"></circle>
          </svg>
          <span ref={progressContent} className="text-white"></span>
        </div>
      </Swiper>
    </>
  );
}
