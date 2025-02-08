import OrderHistory from "@/components/order-history";
import ProfilePage from "@/components/profile";
import { client } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 30;

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

const getOrders = async (userId: string) => {
  const query = `*[_type == "order" && customer._ref == "${userId}"]{
  _createdAt,
    status,
    totalPrice
}`;

  return client.fetch(query);
};

const Profile = async () => {
  const { userId } = await auth();
  const orders = await getOrders(userId!);

  let user;
  try {
    user = await getData(userId!);
  } catch (error) {
    return <div className="mt-24">Error loading user data</div>;
  }

  return (
    <>
      <ProfilePage
        name={user.name}
        addressLine1={user.addressLine1}
        addressLine2={user.addressLine2}
        country={user.country}
        city={user.city}
        email={user.email}
        phone={user.phone}
        state={user.state}
      />

      <OrderHistory orders={orders} />
    </>
  );
};

export default Profile;
