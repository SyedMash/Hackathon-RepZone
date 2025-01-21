import Cart from "@/components/cart";
import { client } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const getData = async (userId: string) => {
  const query = `*[_type == "customer" && _id == "${userId}"][0]{
    name,
    email,
    addressLine1,
    addressLine2,
    country,
    city,
    state,
    phone,
    _id
}`;
  return client.fetch(query);
};

const CartPage = async () => {
  const { userId } = await auth();
  const user = await getData(userId!);

  return (
    <section className="container mx-auto h-fit px-2 xl:px-0">
      <Cart
        name={user.name}
        addressLine1={user.addressLine1}
        addressLine2={user.addressLine2}
        country={user.country}
        city={user.city}
        email={user.email}
        phone={user.phone}
        state={user.state}
      />
    </section>
  );
};

export default CartPage;
