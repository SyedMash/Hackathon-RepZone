import Filter from "@/components/filter";
import ProductCard from "@/components/products-ui/product-card";
import { client } from "@/sanity/lib/client";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 30;

interface Products {
  name: string;
  price: string;
  description: string;
  slug: string;
  images: any[];
  categoryName: string;
  subCategoryName: string;
}

const getCategoryData = async (slug: string, category: string) => {
  const query = `*[_type == "product" && subcategory->slug.current == "${slug}" && category->slug.current == "${category}"]
  {
   name,
    price,
    "slug": slug.current,
    images,
    "categoryName": category->slug.current,
    "subCategoryName": subcategory->slug.current,
    description
}`;
  return client.fetch(query);
};

const CategoryPage = async ({
  params,
}: {
  params: { slug: string; category: string };
}) => {
  const products: Products[] = await getCategoryData(
    params.slug,
    params.category
  );

  if (products.length === 0) {
    return (
      <section className="min-h-screen relative container mx-auto flex items-center justify-center">
        <div className="">
          <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
            {params.category} {params.slug} Collection
          </h1>
          <p className="">
            No products are available at the moment, check back later
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="h-[40vh] bg-[url(/images/pc/gym1.jpg)] bg-no-repeat bg-cover bg-center relative">
        <div className="flex items-center justify-between absolute bottom-5 left-5">
          <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white">
            {params.slug} Collection
          </h1>
        </div>
      </div>
      <div className="min-h-screen overflow-hidden flex lg:gap-3 px-2 mt-6">
        <Filter />
        <div className=" w-full lg:w-full">
          <div className="grid grid-cols- sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2">
            {products.map((product, idx: number) => (
              <ProductCard
                name={product.name}
                description={product.description}
                images={product.images}
                price={product.price}
                slug={product.slug}
                subCategory={product.subCategoryName}
                category={product.categoryName}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
