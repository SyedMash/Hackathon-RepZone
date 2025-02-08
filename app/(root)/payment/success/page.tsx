"use client";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";

const SuccessPage = () => {
  return (
    <section className="min-h-[50vh] container mx-auto px-2 xl:px-0 flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <CheckCircleIcon className="h-16 w-16 text-green-700" />
        <h1 className="text-lg">Payment Successful</h1>
        <p className="text-xl">Thank you for your order.</p>
        <div className="flex gap-3">
          <Link href={"/"}>
            <Button variant={"outline"}>Continue Shopping</Button>
          </Link>
          <Link href={"/profile"}>
            <Button variant={"outline"}>View Order</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
