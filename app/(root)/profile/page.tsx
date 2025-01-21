import ProfilePage from "@/components/profile";
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

const Profile = async () => {
  const { userId } = await auth();
  let user;
  try {
    user = await getData(userId!);
  } catch (error) {
    return <div className="mt-24">Error loading user data</div>;
  }

  return user ? (
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
  ) : (
    <div>Error loading user data</div>
  );
};

export default Profile;
