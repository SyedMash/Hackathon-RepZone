"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { BiChevronDown, BiFilter, BiX } from "react-icons/bi";
import { Card } from "./ui/card";

const Filter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openSection, setOpenSection] = useState("price");
  const [priceRange, setPriceRange] = useState(200);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <>
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="fixed bottom-5 left-5 z-50 lg:hidden bg-black text-white h-12 w-12 rounded-full flex items-center justify-center text-2xl"
      >
        {isFilterOpen ? <BiX /> : <BiFilter />}
      </button>

      <div className="lg:w-[20%] w-0">
        <div
          className={`fixed lg:relative bottom-0 left-0 w-full lg:bg-transparent z-40 transform transition-transform duration-300 ${
            isFilterOpen ? "translate-y-0" : "translate-y-full lg:translate-y-0"
          }`}
        >
          <Card className="rounded-t-[30px] lg:rounded-[30px] p-6 border border-black/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button className="text-xl">
                <BiFilter />
              </Button>
            </div>

            <div className="mb-6">
              <button
                className="w-full flex items-center justify-between py-2"
                onClick={() => toggleSection("price")}
              >
                <span className="font-semibold">Price</span>
                <BiChevronDown
                  className={`transform transition-transform ${
                    openSection === "price" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === "price" && (
                <div className="mt-4">
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full border-none outline-none"
                    placeholder="Price"
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>$50</span>
                    <span>$200</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                className="w-full flex items-center justify-between py-2"
                onClick={() => toggleSection("colors")}
              >
                <span className="font-semibold">Colors</span>
                <BiChevronDown
                  className={`transform transition-transform ${
                    openSection === "colors" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === "colors" && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-red-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-yellow-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-orange-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-blue-600 cursor-pointer ring-2 ring-blue-600 ring-offset-2"></div>
                  <div className="h-8 w-8 rounded-full bg-purple-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-pink-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-white border cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-black cursor-pointer"></div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                className="w-full flex items-center justify-between py-2"
                onClick={() => toggleSection("size")}
              >
                <span className="font-semibold">Size</span>
                <BiChevronDown
                  className={`transform transition-transform ${
                    openSection === "size" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === "size" && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <button className="px-3 py-2 rounded-full bg-[#f2f0f1]">
                    XX-Small
                  </button>
                  <button className="px-3 py-2 rounded-full bg-[#f2f0f1]">
                    X-Small
                  </button>
                  <button className="px-3 py-2 rounded-full bg-[#f2f0f1]">
                    Small
                  </button>
                  <button className="px-3 py-2 rounded-full bg-[#f2f0f1]">
                    Medium
                  </button>
                  <button className="px-3 py-2 rounded-full bg-black text-white">
                    Large
                  </button>
                  <button className="px-3 py-2 rounded-full bg-[#f2f0f1]">
                    X-Large
                  </button>
                  <button className="px-3 py-2 rounded-full bg-[#f2f0f1]">
                    XX-Large
                  </button>
                  <button className="px-3 py-2 rounded-full bg-[#f2f0f1]">
                    3X-Large
                  </button>
                  <button className="px-3 py-2 rounded-full bg-[#f2f0f1]">
                    4X-Large
                  </button>
                </div>
              )}
            </div>

            <Button className="w-full rounded-full py-3 mt-6">
              Apply Filter
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Filter;
