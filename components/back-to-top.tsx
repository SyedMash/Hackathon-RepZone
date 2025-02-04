"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {ArrowUpFromDot } from "lucide-react";

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
      <ArrowUpFromDot
        className="h-6 w-6 text-black cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default BackToTop;
