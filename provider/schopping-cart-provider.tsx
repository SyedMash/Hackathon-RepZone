"use client";

import { CartProvider } from "use-shopping-cart";

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider
      currency="USD"
      mode="payment"
      cartMode="client-only"
      successUrl=""
      cancelUrl=""
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
      shouldPersist
      language="en-US"
    >
      {children}
    </CartProvider>
  );
};

export default ShoppingCartProvider;
