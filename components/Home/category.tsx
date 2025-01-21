/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import Link from "next/link";

//components imports
import { Card } from "@/components/ui/card";

//types and constants imports
import { collections } from "@/constants";

const Category = () => {
  return (
    <section className="min-h-screen container mx-auto mt-12 px-2 xl:px-0">
      <div className="h-[100vh] flex flex-col md:flex-row gap-3">
        <div className="md:h-full h-2/4 md:w-2/4 w-full flex flex-col gap-3">
          <div className="h-2/4 w-full bg-black rounded-3xl overflow-hidden p-2 md:p-5 lg:p-10">
            <h1 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-wrap leading-relaxed">
              We Never <br /> Go Out <br /> Of Style
            </h1>
          </div>
          <div className="relative overflow-hidden h-2/4 w-full bg-[url(/images/pc/7.jpg)] bg-no-repeat bg-cover bg-center rounded-3xl">
            <div className="h-full w-full bg-black absolute opacity-60"></div>
          </div>
        </div>
        <div className="relative overflow-hidden md:h-full h-2/4 md:w-2/4 w-full bg-[url(/images/pc/6.jpg)] bg-no-repeat bg-cover bg-center rounded-3xl">
          <div className="h-full w-full bg-black absolute opacity-60"></div>
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
