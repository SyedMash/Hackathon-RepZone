import GetDataForm from "@/components/get-data-form";
import CustomerSatisfaction from "@/components/product-page/customer-satis";
import ProductSlide from "@/components/product-page/product-slide";
import ProductCard from "@/components/products-ui/product-card";
import { Card } from "@/components/ui/card";
import { client } from "@/lib/client";
import { urlFor } from "@/lib/image";
import React from "react";

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

const getProductData = async (slug: string) => {
  const query = `*[_type == "product" && slug.current == "${slug}" ][0]
{
    name,
    description,
    price,
    images,
    size,
    "category": category->title,
    stock,
    _id
}`;
  return client.fetch(query);
};

const getProductCategory = async (categoryName: string) => {
  const query = `*[_type == "product" && category->title == "${categoryName}"][0..3]{
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
  return client.fetch(query);
};

const ProductPage = async ({ params }: { params: { productSlug: string } }) => {
  const product: Product = await getProductData(params.productSlug);
  const categoryProducts: Product[] = await getProductCategory(
    product.category
  );

  return (
    <section className="min-h-screen container mx-auto px-2 xl:px-0">
      <div className="mt-32 h-[50vh] w-full">
        <ProductSlide images={product.images || []} />
      </div>
      <Card className="w-full min-h-[30vh] mt-6 rounded-xl flex flex-col lg:flex-row gap-3 border-none">
        <div className="h-2/4 lg:min-h-[30vh] w-full lg:w-2/4 p-2  lg:p-3 xl:p-5 flex flex-col gap-2  rounded-b-xl lg:rounded-r-xl">
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">
            {product.name}
          </h1>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="mt-auto">
            <p className="text-xl  lg:text-6xl xl:text-8xl font-bold lg:mt-5">
              ${product.price}
            </p>
          </div>
          <p className="mt-auto">Category: {product.category}</p>
        </div>
        <div className="h-2/4 lg:min-h-[30vh] w-full lg:w-2/4 p-2 flex flex-col gap-5 lg:gap-0">
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
        category={product.category}
        price={product.price}
        size={product.size}
        slug={product.slug}
        stock={product.stock}
        _id={product._id}
        images={product.images}
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
              category={product.category}
              imageUrl={urlFor(product.images[0]).url()}
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
