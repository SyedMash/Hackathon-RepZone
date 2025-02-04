"use client";
import { navLinksMen, navLinksWomen } from "@/constants";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const mobileNavLinks = [
  { name: "Men", imageUrl: "" },
  { name: "Women", imageUrl: "" },
];

interface MobileNavProps {
  onClickLink: () => void;
}

const MobileNav = ({ onClickLink }: MobileNavProps) => {
  const [showNav, setShowNav] = useState(true);
  const [showLinks, setShowLinks] = useState(false);
  const [showMen, setShowMen] = useState(false);
  const [showWomen, setShowWomen] = useState(false);

  return (
    <>
      {showNav && (
        <>
          {mobileNavLinks.map((link, idx) => (
            <div
              key={idx}
              className="bg-red-400 w-full h-32 relative rounded-lg cursor-pointer"
              onClick={() => {
                setShowNav(false);
                setShowLinks(true);
                if (idx == 0) {
                  setShowMen(true);
                  setShowWomen(false);
                } else if (idx == 1) {
                  setShowWomen(true);
                  setShowMen(false);
                }
              }}
            >
              <h1 className="absolute bottom-3 left-3">{link.name}</h1>
            </div>
          ))}
        </>
      )}
      {showLinks && (
        <>
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => {
              setShowLinks(false);
              setShowNav(true);
            }}
          />
          {showMen && (
            <>
              {navLinksMen.map((link, idx) => (
                <Link href={link.href} key={idx} onClick={onClickLink}>
                  <div className="w-full h-24 relative bg-blue-400 rounded-lg">
                    <h1 className="absolute bottom-3 left-3">{link.name}</h1>
                  </div>
                </Link>
              ))}
            </>
          )}
          {showWomen && (
            <>
              {navLinksWomen.map((link, idx) => (
                <Link href={link.href} key={idx} onClick={onClickLink}>
                  <div className="w-full h-24 relative bg-blue-400 rounded-lg">
                    <h1 className="absolute bottom-3 left-3">{link.name}</h1>
                  </div>
                </Link>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MobileNav;
