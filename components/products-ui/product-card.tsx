"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

//components imports
import { Card } from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";

interface ProductData {
  name: string;
  description: string;
  price: string;
  images: any[];
  slug: string;
  category: string;
  subCategory: string;
  discountedPrice?: string | null;
}

const ProductCard = ({
  name,
  description,
  images,
  category,
  subCategory,
  price,
  slug,
  discountedPrice,
}: ProductData) => {
  const [image, setImage] = useState<string | null>(
    images?.[0] ? urlFor(images[0])?.url() || "" : ""
  );
  const mainContainer = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleChangeImageOnEnter = () => {
    setImage(images?.[1] ? urlFor(images[1])?.url() || "" : "");
  };

  const handleRevertImageOnLeave = () => {
    setImage(images?.[0] ? urlFor(images[0])?.url() || "" : "");
  };

  // useGSAP(() => {
  //   const mm = gsap.matchMedia();
  //   mm.add("(min-width: 1024px)", () => {
  //     gsap.to(".custom-ani", {
  //       translateY: "0%",
  //       opacity: "1",
  //       ease: "none",
  //       duration: 0.15,
  //       scrollTrigger: {
  //         trigger: mainContainer.current,
  //         start: "0% 100%",
  //       },
  //     });
  //   });
  // });

  return (
    <div ref={mainContainer} className="custom-ani">
      <Card
        className="w-full border-none shadow-none cursor-pointer"
        onMouseEnter={handleChangeImageOnEnter}
        onMouseLeave={handleRevertImageOnLeave}
      >
        <div className="overflow-hidden relative bg-gray-100 dark:bg-neutral-900">
          {discountedPrice && (
            <div className="absolute top-2 left-2 bg-red-300 py-1 px-12 rounded-full">
              <p>Save ${discountedPrice}</p>
            </div>
          )}
          <Link href={`/${category}/${subCategory}/${slug}`}>
            <Image
              src={image || ""}
              ref={imageRef}
              alt="image"
              height={1000}
              width={1000}
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <Link href={`/products/${category}/${slug}`}>
              <h1 className="text-xl text-muted-foreground line-clamp-1">
                {name}
              </h1>
            </Link>
            <h1 className="text-xl font-semibold">
              {discountedPrice ? (
                <span className="flex items-center gap-2 font-semibold">
                  ${discountedPrice}{" "}
                  <span className="line-through text-red-300 font-medium">
                    ${price}
                  </span>
                </span>
              ) : (
                <span>${price}</span>
              )}
            </h1>
          </div>
          <div>colors will be shown here</div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
