export const navLinksMen = [
  {
    name: "Compression Shirt",
    href: "/mens/compression-shirt",
    bgImage: "/images/pc/10.jpg",
    description: "Compression shit collections",
  },
  {
    name: "Shorts",
    href: "/mens/shorts",
    bgImage: "/images/pc/1.jpg",
    description: "Shorts Collection",
  },
  {
    name: "Tank Tops",
    href: "/mens/tank-tops",
    bgImage: "/images/pc/9.jpg",
    description: "Tank Tops collection",
  },
];

export const navLinksWomen = [
  {
    name: "Compression Shirt",
    href: "/women/compression-shirt",
    bgImage: "/images/pc/10.jpg",
    description: "Compression shit collections",
  },
  {
    name: "Shorts",
    href: "/women/shorts",
    bgImage: "/images/pc/1.jpg",
    description: "Shorts Collection",
  },
  {
    name: "Tank Tops",
    href: "/women/tank-tops",
    bgImage: "/images/pc/9.jpg",
    description: "Tank Tops collection",
  },
];

export const collections = [
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

export const quotes = [
  {
    message:
      "I hated every minute of training, but I said, ‘Don’t quit. Suffer now and live the rest of your life as a champion",
    author: "Muhammad Ali",
  },
  {
    message:
      "We are what we repeatedly do. Excellence then is not an act but a habit",
    author: "Aristotele",
  },
  {
    message: "The body achieves what the mind believes",
    author: "Napoleon Hill",
  },
  {
    message:
      "If you don’t find the time, if you don’t do the work, you don’t get the results",
    author: "Arnold Schwarzenegger",
  },
  {
    message: "The real workout starts when you want to stop",
    author: "Ronnie Coleman",
  },
  {
    message: "Do something today that your future self will thank you for",
    author: "Sean Patrick",
  },
  {
    message: "You must expect things of yourself before you can do them",
    author: " Michael Jordan",
  },
];
