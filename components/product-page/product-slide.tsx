"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function ProductSlide({ images }: { images: any[] }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        className="mySwiper h-full w-full"
      >
        {images.map((image, idx:number) => (
          <SwiperSlide key={idx} className="h-full rounded-xl overflow-hidden cursor-grab active:cursor-grabbing">
            <Image
              src={urlFor(image).url()}
              alt="name"
              height={1000}
              width={1000}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
