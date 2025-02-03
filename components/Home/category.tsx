"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

//components imports
import { Card } from "@/components/ui/card";

//types and constants imports
import { collections, quotes } from "@/constants";
import { Button } from "../ui/button";

const Category = () => {
  const [quote, setQuote] = useState({
    message: quotes[0].message,
    author: quotes[0].author,
  });
  useEffect(() => {
    if (quotes.length > 1) {
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % quotes.length;
        setQuote({
          message: quotes[index].message,
          author: quotes[index].author,
        });
      }, 7000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section className="min-h-screen container mx-auto mt-12 overflow-hidden px-2  2xl:max-w-[1800px]">
      <div className="h-[80vh] flex flex-col md:flex-row gap-3">
        <div className="md:h-full h-2/4 md:w-2/4 w-full flex flex-col gap-3">
          <div className="h-2/4 w-full bg-black rounded-3xl overflow-hidden p-2 md:p-5 lg:p-10 relative">
            <h1 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl text-wrap leading-relaxed uppercase">
              {quote.message}
            </h1>
            <h1 className="absolute right-5 bottom-5 text-white">
              ~{quote.author}
            </h1>
          </div>
          <div className="relative overflow-hidden h-2/4 w-full bg-[url(/images/banners/model_showcase_male.jpg.png)] bg-no-repeat bg-cover bg-center rounded-3xl">
            <Link href={""} className="absolute w-full">
              <Button className="w-full">Buy Now</Button>
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden md:h-full h-2/4 md:w-2/4 w-full bg-[url(/images/banners/model_showcase_female.jpg)] bg-no-repeat bg-cover bg-center rounded-3xl">
          <Link href={""} className="absolute bottom-0 left-0 w-full">
            <Button className="w-full">Buy Now</Button>
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-5">
        {collections.map((collection, idx: number) => (
          <Link href={`/products/${collection.slug}`} key={idx}>
            <Card className={`relative overflow-hidden min-h-56 max-h-56`}>
              <div className="h-full w-full bg-black/50 absolute z-20 backdrop-blur-sm p-2 md:p-5">
                <h1 className="text-2xl font-semibold text-white">
                  {collection.title}
                </h1>
                <p className="text-muted-foreground">
                  {collection.description}
                </p>
              </div>
              <Image
                src={collection.imageUrl}
                alt={collection.title}
                height={1000}
                width={1000}
                className="w-full h-full object-cover absolute"
              />
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Category;
