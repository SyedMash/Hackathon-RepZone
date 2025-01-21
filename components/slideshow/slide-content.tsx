/* eslint-disable @next/next/no-img-element */
import React from "react";
import SlideShowProductCard from "./slideshow-pro-card";
import Image from "next/image";

interface ContentProps {
  imageUrl: string;
  title: string;
  description: string;
  slug: string;
  href: string;
}

const SlideContent = ({ description, imageUrl, title, slug, href }: ContentProps) => {
  return (
    <section className={`h-full relative`}>
      <Image
        src={imageUrl}
        alt=""
        height={1000}
        width={1000}
        className="h-full w-full object-cover absolute"
      />
      <div className="h-full w-full bg-black/50 backdrop-blur-sm absolute">
        <div className="absolute bottom-24 left-2 xl:bottom-10 xl:left-10">
          <SlideShowProductCard
            title={title}
            description={description}
            slug={slug}
            href={href}
          />
        </div>
      </div>
    </section>
  );
};

export default SlideContent;
