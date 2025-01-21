"use client";
import React, { useEffect, useState } from "react";
import ReviewCard from "../Home/review-card";
import { Accordion } from "../ui/accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import ProductSlide from "./product-slide";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { Card } from "../ui/card";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Product {
  name: string;
  description: string;
  price: string;
  images: string[] | [];
  size: string[];
  category: string;
  stock: string;
  _id: string;
  slug: string;
}

const CustomerSatisfaction = ({
  name,
  description,
  price,
  category,
  _id,
  images,
  slug,
  stock,
  size,
}: Product) => {
  const [showFeatures, setShowFeatures] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [showOneProduct, setShowOneProduct] = useState(false);
  const [oneProductData, setOneProductData] = useState({
    name,
    description,
    price,
    images,
    category,
    slug,
  });

  useEffect(() => {
    const getProductCategory = async () => {
      const query = `*[_type == "product" && category->title == "${category}"][0..3]{
        name,
        description,
        price,
        images,
        size,
        "category": category->title,
        stock,
        _id,
        "slug": slug.current
      }`;
      const data = await client.fetch(query);
      setProducts(data);
    };
    getProductCategory();
  }, [category]);

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between">
        <h1
          onClick={() => {
            setShowFeatures(true);
            setShowReviews(false);
            setShowFAQs(false);
            setShowCompare(false);
          }}
          className={`text-center w-full transition-all ease-linear duration-300 cursor-pointer text-xl pb-1 ${
            showFeatures &&
            "border-b border-black dark:border-white font-semibold"
          }`}
        >
          Features
        </h1>
        <h1
          onClick={() => {
            setShowReviews(true);
            setShowFeatures(false);
            setShowFAQs(false);
            setShowCompare(false);
          }}
          className={`w-full text-center cursor-pointer text-xl transition-all duration-300 pb-1 ${
            showReviews &&
            "border-b border-black dark:border-white font-semibold"
          }`}
        >
          Reviews
        </h1>
        <h1
          onClick={() => {
            setShowFAQs(true);
            setShowFeatures(false);
            setShowReviews(false);
            setShowCompare(false);
          }}
          className={`w-full text-center cursor-pointer text-xl transition-all duration-300 pb-1 ${
            showFAQs && "border-b border-black dark:border-white font-semibold"
          }`}
        >
          FAQs
        </h1>
        <h1
          onClick={() => {
            setShowCompare(true);
            setShowFeatures(false);
            setShowReviews(false);
            setShowFAQs(false);
          }}
          className={`w-full text-center cursor-pointer text-xl transition-all duration-300 pb-1 ${
            showCompare &&
            "border-b border-black dark:border-white font-semibold"
          }`}
        >
          Compare
        </h1>
      </div>

      <div className="mt-12 px-2 xl:px-0">
        {showFeatures && <div>hello my features</div>}
        {showReviews && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        )}
        {showFAQs && (
          <div className="w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-t border-b py-5">
                <AccordionTrigger>Is it machine washable?</AccordionTrigger>
                <AccordionContent>Yes! It is machine washable</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-t border-b py-5">
                <AccordionTrigger>Is it stretchable?</AccordionTrigger>
                <AccordionContent>Yes! It is stretchable</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
        {showCompare && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-2">
              <div className="w-full flex justify-center">
                <Image
                  src={urlFor(images[0]).url()}
                  alt={name}
                  height={200}
                  width={200}
                />
              </div>
              <h1 className="text-lg font-medium">{name}</h1>
              <p className="line-clamp-2 text-muted-foreground text-sm">
                {description}
              </p>
              <p>${price}</p>
            </div>

            <>
              {showOneProduct ? (
                <div className="relative space-y-2">
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => setShowOneProduct(false)}
                    className="absolute"
                  >
                    <ChevronLeft />
                  </Button>
                  <div className="w-full flex justify-center">
                    <Image
                      src={urlFor(oneProductData.images[0]).url()}
                      alt={oneProductData.name}
                      height={200}
                      width={200}
                    />
                  </div>
                  <h1 className="text-lg font-medium">{oneProductData.name}</h1>
                  <p className="line-clamp-2 text-muted-foreground text-sm">
                    {oneProductData.description}
                  </p>
                  <p>${oneProductData.price}</p>

                  <Link
                    href={`/products/${oneProductData.category}/${oneProductData.slug}`}
                  >
                    <Button className="w-full">View</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {products.map((product: any, idx: number) => (
                    <Card
                      key={idx}
                      className={`min-h-24 max-h-64 px-3 cursor-pointer pb-2 ${cn(_id === product._id ? "hidden" : "")}`}
                      onClick={() => {
                        setOneProductData({
                          name: product.name,
                          description: product.description,
                          price: product.price,
                          images: product.images,
                          category: product.category,
                          slug: product.slug,
                        });
                        setShowOneProduct(true);
                      }}
                    >
                      <div className="w-full flex justify-center">
                        <Image
                          src={urlFor(product.images[0]).url()}
                          alt="image"
                          height={100}
                          width={100}
                        />
                      </div>
                      <h1 className="text-sm">{product.name}</h1>
                    </Card>
                  ))}
                </div>
              )}
            </>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerSatisfaction;
