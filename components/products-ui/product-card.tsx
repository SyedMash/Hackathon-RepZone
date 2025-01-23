"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

//components imports
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductData {
  name: string;
  description: string;
  price: string;
  imageUrl: string | null;
  slug: string;
  category: string;
}

const ProductCard = ({
  name,
  description,
  imageUrl,
  category,
  price,
  slug,
}: ProductData) => {
  return (
    <>
      <Card className="p-3 space-y-1 rounded-lg shadow-none border-black/10 cursor-pointer hover:scale-105 transition-all duration-300 group">
        <div className="h-96 rounded-lg  bg-gray-100 group-hover:scale-95 transition-all duration-300">
          <Image
            src={imageUrl || ""}
            alt="image"
            height={1000}
            width={1000}
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
        <Link href={`/products/${category}/${slug}`}>
          <h1 className="text-xl font-semibold">{name} &rarr;</h1>
        </Link>
        <p className="line-clamp-1 text-muted-foreground">{description}</p>
        <div className="flex items-center justify-between">
          <h2 className="text-lg">${price}</h2>
          <Link href={`/products/${category}/${slug}`}>
            <Button>View</Button>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
