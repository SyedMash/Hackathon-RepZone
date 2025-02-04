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
import { ChevronRight } from "lucide-react";

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
      <div className="overflow-hidden px-2 mx-auto md:max-w-[750px] lg:max-w-[1000px] 2xl:max-w-[1800px]">
        <div className="flex justify-between items-end mt-12 mb-6">
          <h1 className="flex flex-col text-xl md:text-2xl lg:text-3xl">
            NEW ARRIVAL
          </h1>
          <span className="text-base">
            <ChevronRight className="h-8 w-8 animate-pulse" />
          </span>
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
              spaceBetween: 10,
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
