export const navLinks = [
  {
    name: "Home",
    href: "/",
    bgImage: "/images/pc/12.jpg",
    description: "Home sweet home for freaks",
  },
  {
    name: "Jeans",
    href: "/products/Jeans",
    bgImage: "/images/pc/10.jpg",
    description: "Jeans collection",
  },
  {
    name: "Hoodie",
    href: "/products/Hoodie",
    bgImage: "/images/pc/1.jpg",
    description: "Women collection",
  },
  {
    name: "T-shirt",
    href: "/products/T-shirt",
    bgImage: "/images/pc/9.jpg",
    description: "T-shirt collection",
  },
];

export const collections = [
  {
    imageUrl: "/images/pc/8.jpg",
    title: "Men's",
    description: "Mens collection for gym ultimate ggs",
    slug: "Mens",
  },
  {
    imageUrl: "/images/pc/9.jpg",
    title: "Women's",
    description: "Women collection for gym ultimate ggs",
    slug: "Women",
  },
  {
    imageUrl: "/images/pc/9.jpg",
    title: "T-Shirts",
    description: "Gym accessories to level up your rizz",
    slug: "T-shirt",
  },
  {
    imageUrl: "/images/pc/10.jpg",
    title: "Jeans",
    description: "Jeans equipment to level up your rizz",
    slug: "Jeans",
  },
];

export const products = [
  {
    imageUrl: "/images/pc/8.jpg",
    title: "Women's",
    description: "Women collection for gym ultimate ggs",
    slug: "Women",
    href: "/products/Women",
  },
  {
    imageUrl: "/images/pc/9.jpg",
    title: "T-Shirts",
    description: "Gym accessories to level up your rizz",
    slug: "T-shirt",
    href: "/products/T-shirt",
  },
  {
    imageUrl: "/images/pc/10.jpg",
    title: "Jeans",
    description: "Jeans equipment to level up your rizz",
    slug: "Jeans",
    href: "/products/Jeans",
  },
];

export const displayProductImages = [
  "/images/pc/1.jpg",
  "/images/pc/2.jpg",
  "/images/pc/11.jpg",
  "/images/pc/4.jpg",
  "/images/pc/5.jpg",
  "/images/pc/6.jpg",
  "/images/pc/7.jpg",
  "/images/pc/8.jpg",
  "/images/pc/9.jpg",
  "/images/pc/10.jpg",
];

export const generateKey = () => {
  const numbers = "123456789";
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const smallAlphabets = "abcdefghijklmnopqrstuvwxyz";
  const merged = numbers + alphabets + smallAlphabets;
  let key: string = "";

  for (let index = 0; index < 13; index++) {
    const randomIndex = Math.floor(Math.random() * 10);
    key += merged[randomIndex];
  }
  return key;
};
