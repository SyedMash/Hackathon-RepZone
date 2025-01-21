"use client";
import React, { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

const SuccessPage = () => {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return <div>success</div>;
};

export default SuccessPage;
