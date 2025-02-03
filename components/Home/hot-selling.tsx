"use client";

import React, { useState } from "react";

//components imports
import ProductCard from "@/components/products-ui/product-card";
import { client } from "@/sanity/lib/client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

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
const NewArrivals = ({ products }: { products: ProductData[] }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <>
      <div className="overflow-hidden px-2 mx-auto 2xl:max-w-[1800px] mb-24">
        <div className="">
          <h1 className="text-center flex flex-col gap-2 text-xl md:text-2xl lg:text-3xl font-bold my-12 text-muted-foreground">
            HOT SELLING
          </h1>
        </div>
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
          className="mySwiper h-full w-full"
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
                  description={product.description}
                  images={product.images}
                  category={product.categoryName}
                  price={product.price}
                  slug={product.slug}
                  subCategory={product.subCategoryName}
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

export default NewArrivals;
