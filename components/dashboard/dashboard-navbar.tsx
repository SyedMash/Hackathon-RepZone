"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModeToggle } from "../toggle-theme";
import { CrossIcon, MenuIcon, User } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const dashLinks = [
  {
    name: "Storefront",
    href: "/",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
  },
  {
    name: "Products",
    href: "/dashboard/products",
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
  },
  {
    name: "Banners",
    href: "/dashboard/banners",
  },
];

const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} size={"icon"} className="rounded-full">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer w-full" asChild>
          <SignOutButton>Logout</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DashboardNavbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <motion.div
        className="w-full fixed top-5 left-0 h-16 z-50 px-2 xl:px-0"
        initial={{ y: "-100%", opacity: "0" }}
        animate={{ y: "0%", opacity: "1" }}
      >
        <div className="h-full container mx-auto flex items-center justify-between px-2  bg-black/50 backdrop-blur-lg rounded-lg">
          <Link href={"/dashboard"}>
            <Image
              src={"/images/pc/logowhite.png"}
              alt="logo"
              height={200}
              width={200}
              className="invert dark:invert-0"
            />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-5">
              {dashLinks.map((navLink, idx: number) => (
                <Link href={navLink.href} key={idx}>
                  <li
                    className={cn(
                      navLink.href === pathname
                        ? "text-[#466e74]"
                        : "text-white"
                    )}
                  >
                    {navLink.name}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserButton />
            <Button
              size={"icon"}
              className="bg-black lg:hidden"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? (
                <CrossIcon className="rotate-45 text-white"></CrossIcon>
              ) : (
                <MenuIcon className=" text-white" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {navOpen && (
          <motion.div
            className="h-screen w-full top-0 left-0 bg-black/50 z-40 fixed backdrop-blur-xl px-4 lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ ease: "linear" }}
            exit={{ x: "100%" }}
          >
            <div className="mt-32 flex flex-col gap-6">
              {dashLinks.map((dashLink, idx: number) => (
                <Link
                  href={dashLink.href}
                  onClick={() => setNavOpen(false)}
                  key={idx}
                  className=""
                >
                  <Card className="relative h-36 overflow-hidden">
                    <Image
                      src={""}
                      alt={dashLink.name}
                      height={1000}
                      width={1000}
                      className="h-full w-full object-cover object-top absolute"
                    />
                    <div className="absolute p-5 bg-black/50 w-full h-full">
                      <h1 className="text-xl font-semibold text-white">
                        {dashLink.name}
                      </h1>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardNavbar;
