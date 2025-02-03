"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowBigUp, ArrowUpFromDot } from "lucide-react";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 bg-[#bdcbc5] rounded-full overflow-hidden p-2 z-20 ${cn(showButton ? "block" : "hidden")}`}
    >
      <Link href={"#"} className="">
        <ArrowUpFromDot className="h-6 w-6 text-black" />
      </Link>
    </div>
  );
};

export default BackToTop;
