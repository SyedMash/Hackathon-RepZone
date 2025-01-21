"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { useToast } from "@/hooks/use-toast";

interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
  stock: string;
  id: string;
}

const GetDataForm = ({
  name,
  description,
  image = "",
  price,
  stock,
  id,
}: Product) => {
  const { addItem, setItemQuantity, incrementItem } = useShoppingCart();
  const { toast } = useToast();
  const [count, setCount] = useState(1);

  const form = useForm();

  const handleSubmit = (data: any) => {
    if (data.size && data.color) {
      const addToCartProduct = {
        name,
        description,
        image,
        price: Number(price),
        stock,
        id,
        size: data.size,
        color: data.color,
        currency: "USD",
      };
      addItem(addToCartProduct);
      setItemQuantity(id, count);
      toast({
        title: "Product Added Successfully",
        description: `Product ${name} added to your cart`,
      });
    } else {
      alert("Please choose size and colors");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="h-full lg:min-h-[30vh] flex flex-col gap-5"
        >
          <div className="space-y-6">
            <FormField
              name="color"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="size"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                type="button"
                asChild
                size={"icon"}
                className="cursor-pointer"
                onClick={() =>
                  setCount((prev) => {
                    if (count > 1) {
                      return prev - 1;
                    }
                    return prev;
                  })
                }
              >
                <span className="h-12 w-12">-</span>
              </Button>
              <Button type="button" className="w-full">
                {count} / {stock}
              </Button>
              <Button
                type="button"
                asChild
                size={"icon"}
                className="cursor-pointer"
                onClick={() => {
                  setCount((prev) => {
                    if (count < Number(stock)) {
                      return prev + 1;
                    }
                    return prev;
                  });
                }}
              >
                <span className="h-12 w-12">+</span>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="w-full">
                ADD TO CART
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default GetDataForm;
