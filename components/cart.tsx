"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { Card } from "./ui/card";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import ShippingForm from "./shipping-form";

export interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
  stock: string;
  id: string;
  size: string;
  color: string;
  quantity: number;
}

interface UserData {
  name: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  phone: string;
  zipcode?: string;
}

const Cart = ({
  name,
  addressLine1,
  addressLine2,
  city,
  country,
  email,
  phone,
  state,
  zipcode,
}: UserData) => {
  const { cartDetails, cartCount, removeItem, totalPrice } = useShoppingCart();
  const [loading, setLoading] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [disableCheckout, setDisableCheckout] = useState(true);
  const [rateId, setRateId] = useState("");

  const handleStripe = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartDetails, rateId }),
      });
      if (!response.ok) throw new Error("something went wrong");
      const { sessionId } = await response.json();
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!
      );
      if (!stripe) throw new Error("stripe failed to load");
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "You cart is empty or something else",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cartCount! >= 1) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [cartCount]);

  return (
    <div className="mt-24 space-y-6">
      <div>
        <h1 className="text-center">CART</h1>
        <p className="text-center">
          YOU CURRENTLY HAVE {cartCount} ITEMS IN YOUR CART
        </p>
      </div>

      {showShipping ? (
        <motion.div className="h-fit ">
          <div>
            <Button
              asChild
              variant={"ghost"}
              size={"icon"}
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setShowShipping(false)}
            >
              <ChevronLeft />
            </Button>
          </div>
          <div className="mt-12">
            <ShippingForm
              name={name}
              addressLine1={addressLine1}
              addressLine2={addressLine2}
              country={country}
              state={state}
              city={city}
              email={email}
              phone={phone}
              onSelectRates={(rateId) => {
                setDisableCheckout(false);
                setRateId(rateId);
              }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div className="h-fit flex flex-col gap-2">
          {Object.values(cartDetails ?? {}).map((product, idx) => (
            <Card
              key={idx}
              className="lg:p-5 flex gap-3 relative overflow-hidden"
            >
              <div className="h-24 w-24 overflow-hidden rounded-lg">
                <Image
                  src={product.image || ""}
                  alt={product.name}
                  width={1000}
                  height={1000}
                  className="h-full object-cover"
                />
                <Button
                  className="absolute bottom-1 right-1 lg:bottom-5 lg:right-5 bg-destructive"
                  onClick={() => {
                    removeItem(product.id);
                  }}
                >
                  Delete
                </Button>
              </div>
              <div className="w-full">
                <h1 className="text-sm md:text-lg font-medium">
                  {product.name}
                </h1>
                <p className="text-muted-foreground text-sm line-clamp-1">
                  Size: {product.size}
                </p>
                <p className="text-muted-foreground text-sm line-clamp-1">
                  Color: {product.color}
                </p>
                <p className="text-muted-foreground">price: ${product.price}</p>
                <p className="text-muted-foreground">
                  Quantity: {product.quantity}
                </p>
              </div>
            </Card>
          ))}
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">TOTAL: ${totalPrice}</h1>
        <h1>coupon div --later</h1>
      </div>

      <div className="flex flex-col gap-2">
        <Link href={"/"} className="w-full">
          <Button className="w-full" variant={"outline"}>
            Continue Shopping
          </Button>
        </Link>
        {showShipping ? (
          <Button
            variant={"secondary"}
            className="w-full cursor-pointer"
            onClick={handleStripe}
            disabled={disableCheckout}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <div className="flex items-center overflow-hidden">
                <span>Checkout</span>
                <Image
                  src={"/images/logo/stripe.svg"}
                  alt="stripe-logo"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            )}
          </Button>
        ) : (
          <Button
            onClick={() => setShowShipping(true)}
            variant={"secondary"}
            disabled={disableButton}
            className="w-full cursor-pointer"
          >
            Shipping &rarr;
          </Button>
        )}
      </div>
    </div>
  );
};

export default Cart;
