"use client";
import React, { useState } from "react";

import ProductCard from "../products-ui/product-card";
import Link from "next/link";
import CustomButton from "../custom-button/cb";

import { Libre_Bodoni } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";

const libre = Libre_Bodoni({
  style: "normal",
  subsets: ["latin"],
  weight: "600",
});

interface ProductData {
  name: string;
  description: string;
  price: string;
  images: any[];
  slug: string;
  categoryName: string;
  subCategoryName: string;
  discountedPrice?: string | null;
}

const Male = ({ products }: { products: ProductData[] }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <>
      <section className="my-12">
        <div className="h-[50vh] relative w-full bg-[url(/images/banners/arc_new_phone_female_banner.jpg)] lg:bg-[url(/images/banners/new_arc_female_banner.png)] bg-no-repeat bg-cover">
          <div className="absolute bottom-3 left-2 lg:bottom-12 lg:left-12 flex flex-col gap-12">
            <h1
              className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-8xl dark:invert ${libre.className}`}
            >
              WOMEN COLLECTION
            </h1>
            <Link href={"/products/Women"}>
              <CustomButton />
            </Link>
          </div>
        </div>
      </section>
      <div className="overflow-hidden px-2 mx-auto md:max-w-[750px] lg:max-w-[1000px] 2xl:max-w-[1800px]">
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
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          // modules={[Pagination]}
          className=" h-full w-full"
        >
          {products.map((product, idx: number) => (
            <SwiperSlide
              key={idx}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div
                className={`transition-all duration-300  ${
                  hoverIndex !== null && hoverIndex !== idx
                    ? "filter blur-sm  opacity-50 scale-95"
                    : "filter blur-none opacity-100"
                }`}
              >
                <ProductCard
                  name={product.name}
                  subCategory={product.subCategoryName}
                  description={product.description}
                  images={product.images}
                  category={product.categoryName}
                  price={product.price}
                  slug={product.slug}
                  discountedPrice={product.discountedPrice || null}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Male;
