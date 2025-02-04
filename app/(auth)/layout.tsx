import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="h-screen w-full flex">
        <div className="h-full w-2/4 hidden lg:block bg-gray-100 dark:bg-neutral-800">
          <Image
            src={"/images/banners/BOTH.png"}
            alt=""
            height={1000}
            width={1000}
            className="w-full h-full  object-cover object-top"
          />
        </div>
        <div className="h-full lg:w-2/4 w-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
