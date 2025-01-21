import React from "react";

//components imports
import ProductCard from "@/components/products-ui/product-card";
import { client } from "@/lib/client";

interface ProductData {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  slug: string;
  categoryName: string;
}

const getProductData = async () => {
  const query = `*[_type == "product"][0..7]{
    name,
    description,
    price,
    "imageUrl": images[0].asset->url,
      "slug": slug.current,
    "categoryName": category->title

}`;
  return client.fetch(query);
};

const NewArrivals = async () => {
  const products: ProductData[] = await getProductData();

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-xl md:text-2xl lg:text-4xl font-bold my-12">
        NEW GEAR DROP
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2 xl:px-0 gap-5">
        {products.map((product, idx: number) => (
          <ProductCard
            name={product.name}
            description={product.description}
            imageUrl={product.imageUrl || null}
            category={product.categoryName}
            price={product.price}
            slug={product.slug}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
