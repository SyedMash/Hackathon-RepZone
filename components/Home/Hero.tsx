//components imports
import Slider from "@/components/Home/slider";
import NewArrivals from "@/components/Home/new-arrivals";
import Category from "@/components/Home/category";
import Review from "./review";
import HotSelling from "./hot-selling";
import Male from "./male";
import Female from "./female";
import { client } from "@/sanity/lib/client";

interface ProductData {
  name: string;
  description: string;
  price: string;
  images: any[];
  imageUrl: string;
  slug: string;
  categoryName: string;
  subCategoryName: string;
  discountedPrice?: string | null;
}

const getProductData = async () => {
  const query = `*[_type == "product"][0..7]{
    name,
    description,
    price,
    discountedPrice,
    images,
      "slug": slug.current,
    "categoryName": category->slug.current,
    "subCategoryName": subcategory->slug.current

}`;
  return client.fetch(query);
};

const getMaleProductData = async () => {
  const query = `*[_type == "product" && category->title == "Mens"][0..3]{
    name,
    description,
    price,
    discountedPrice,
    images,
      "slug": slug.current,
    "categoryName": category->slug.current,
    "subCategoryName": subcategory->slug.current

}`;
  return client.fetch(query);
};

const getFemaleProductData = async () => {
  const query = `*[_type == "product" && category->title == "Women"][0..3]{
    name,
    description,
    price,
    discountedPrice,
    images,
      "slug": slug.current,
    "categoryName": category->slug.current,
    "subCategoryName": subcategory->slug.current

    }`;

  return client.fetch(query);
};

const getHotProductData = async () => {
  const query = `*[_type == "product"][0..3]{
    name,
    description,
    price,
    discountedPrice,
    images,
      "slug": slug.current,
    "categoryName": category->slug.current,
    "subCategoryName": subcategory->slug.current

}`;
  return client.fetch(query);
};

const Hero = async () => {
  const newProducts: ProductData[] = await getProductData();
  const maleProducts: ProductData[] = await getMaleProductData();
  const femaleProducts: ProductData[] = await getFemaleProductData();
  const hotProducts: ProductData[] = await getHotProductData();

  return (
    <section className="min-h-screen">
      <div className="h-[80vh] w-full relative bg-[url(/images/banners/arc_new_phone_main_banner.jpg)] xl:bg-[url(/images/banners/mainBanner.png)] bg-no-repeat bg-cover bg-top xl:bg-center"></div>
      <div className="mb-24">
        <NewArrivals products={newProducts} />
      </div>
      <Male products={maleProducts} />
      <Female products={femaleProducts} />
      <Category />
      <div className="h-fit">
        <HotSelling products={hotProducts} />
      </div>
      <Slider />
      <Review />
    </section>
  );
};

export default Hero;
