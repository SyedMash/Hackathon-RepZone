import GetDataForm from "@/components/get-data-form";
import CustomerSatisfaction from "@/components/product-page/customer-satis";
import ProductSlide from "@/components/product-page/product-slide";
import ProductCard from "@/components/products-ui/product-card";
import { Card } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 30;

interface Product {
  name: string;
  description: string;
  price: string;
  images: string[] | [];
  size: string[];
  categoryName: string;
  subCategoryName: string;
  stock: string;
  _id: string;
  slug: string;
  discountedPrice?: string | null;
}

const getProductData = async (slug: string) => {
  const query = `*[_type == "product" && slug.current == "${slug}" ][0]
{
    name,
    description,
    price,
    images,
    size,
    discountedPrice,
    "categoryName": category->slug.current,
    "subCategoryName": subcategory->slug.current,
    stock,
    _id
}`;
  return client.fetch(query);
};

const getProductCategory = async (categoryName: string) => {
  const query = `*[_type == "product" && category->slug.current == "${categoryName}"][0..3]{
    name,
    description,
    price,
    images,
    size,
    "categoryName": category->slug.current,
    "subCategoryName": subcategory->slug.current,
    stock,
    _id,
    "slug": slug.current
  }`;
  return client.fetch(query);
};

const getReviewData = async (id: string) => {
  const query = `*[_type == "review" && ofProduct._ref == "${id}"]{
    title,
    content,
}`;
  return client.fetch(query);
};

const ProductPage = async ({
  params,
}: {
  params: { productSlug: string; category: string };
}) => {
  const product: Product = await getProductData(params.productSlug);
  const categoryProducts: Product[] = await getProductCategory(params.category);
  const reviews = await getReviewData(product._id);

  return (
    <section className="min-h-screen container mx-auto px-2 xl:px-0">
      <div className="mt-16 lg:mt-32 h-fit w-full">
        <ProductSlide images={product.images || []} />
      </div>
      <Card className="w-full h-fit mt-6 rounded-xl flex flex-col lg:flex-row gap-3 border-none">
        <div className="h-2/4 lg:h-fit w-full lg:w-2/4 p-2  lg:p-3 xl:p-5 flex flex-col gap-2  rounded-b-xl lg:rounded-r-xl">
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">
            {product.name}
          </h1>
          {/* <p className="text-muted-foreground">{product.description}</p> */}
          <div className="">
            <p className="text-xl text-[#466e74] lg:text-6xl xl:text-8xl font-bold lg:mt-5">
              {product.discountedPrice ? (
                <span className="flex items-center gap-2 font-semibold">
                  ${product.discountedPrice}{" "}
                  <span className="line-through text-red-300 font-medium text-sm lg:text-3xl xl:text-4xl">
                    ${product.price}
                  </span>
                </span>
              ) : (
                <span>${product.price}</span>
              )}
            </p>
          </div>
          <p className="">Category: {product.categoryName}</p>
        </div>
        <div className="h-2/4 md:h-fit  w-full lg:w-2/4 p-2 flex flex-col gap-5 lg:gap-0">
          <GetDataForm
            name={product.name}
            description={product.description}
            price={product.price}
            stock={product.stock}
            image={urlFor(product.images[0]).url()}
            id={product._id}
          />
          <div className="mt-auto"></div>
        </div>
      </Card>
      <CustomerSatisfaction
        name={product.name}
        description={product.description}
        category={product.categoryName}
        price={product.price}
        size={product.size}
        slug={product.slug}
        stock={product.stock}
        _id={product._id}
        images={product.images}
        reviews={reviews}
      />
      <div className="mt-12">
        <h1 className="text-center uppercase text-xl md:text-2xl font-semibold">
          You may also like
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
          {categoryProducts.map((product, idx) => (
            <ProductCard
              key={idx}
              name={product.name}
              description={product.description}
              category={product.categoryName}
              subCategory={product.subCategoryName}
              images={product.images}
              price={product.price}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
