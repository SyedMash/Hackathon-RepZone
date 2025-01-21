import ProductCard from "@/components/products-ui/product-card";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import React from "react";

interface Products {
  name: string;
  price: string;
  description: string;
  slug: string;
  imageUrl: string | "";
  category: string;
}

const getCategoryData = async (slug: string) => {
  const query = `*[_type == "product" && category->title == "${slug}"]
  {
   name,
    price,
    "slug": slug.current,
    "imageUrl": images[0].asset->url,
    "category": category->title,
    description
}`;
  return client.fetch(query);
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const products: Products[] = await getCategoryData(params.slug);

  if (products.length === 0) {
    return (
      <section className="min-h-screen relative container mx-auto flex items-center justify-center">
        <div className="">
          <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
            {params.slug} Collection
          </h1>
          <p className="">
            No products are available at the moment, check back later
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="min-h-screen relative">
      <div className="h-full px-5  overflow-hidden">
        <div className="flex mt-32 items-center justify-between">
          <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
            {params.slug} Collection
          </h1>
          <Button>Filters</Button>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
          {products.map((product, idx: number) => (
            <ProductCard
              name={product.name}
              description={product.description}
              imageUrl={product.imageUrl || ""}
              price={product.price}
              slug={product.slug}
              category={product.category}
              key={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
