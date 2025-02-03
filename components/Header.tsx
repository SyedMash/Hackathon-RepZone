"use client";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [heading, setHeading] = useState("");

  useEffect(() => {
    const headings = ["heading 1", "heading 2", "heading 3"];
    if (headings.length > 1) {
      let index = 0;
      setHeading(headings[index]);
      const interval = setInterval(() => {
        index = (index + 1) % headings.length;
        setHeading(headings[index]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section className="h-10 w-full bg-[#466e74]">
      <div className="container mx-auto h-full flex items-center justify-center">
        <h1 className="text-white animate-pulse">{heading}</h1>
      </div>
    </section>
  );
};

export default Header;
