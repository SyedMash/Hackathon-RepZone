"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModeToggle } from "./toggle-theme";
import { CrossIcon, MenuIcon, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { navLinks } from "@/constants";
import { Card } from "./ui/card";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";

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
        <Link href={"/profile"}>
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer w-full" asChild>
          <SignOutButton>Logout</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { cartCount } = useShoppingCart();
  return (
    <>
      <motion.div
        className="w-full fixed top-5 left-0 h-16 z-50 px-2 xl:px-0"
        initial={{ y: "-100%", opacity: "0" }}
        animate={{ y: "0%", opacity: "1" }}
      >
        <div className="h-full container mx-auto flex items-center justify-between px-2  bg-black/50 backdrop-blur-lg rounded-lg">
          <Link href={"/"}>
            <h1 className="text-red-800 font-bold  text-xl md:text-2xl lg:text-3xl">
              R
              <span className="text-base tracking-normal uppercase text-white">
                ep
              </span>
              Z
              <span className="text-base tracking-normal uppercase text-white">
                one
              </span>
            </h1>
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-5">
              {navLinks.map((navLink, idx: number) => (
                <Link href={navLink.href} key={idx}>
                  <li className="text-white">{navLink.name}</li>
                </Link>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button asChild size="icon" variant={"ghost"} className="px-2">
              <Link href={"/cart"} className="px-2 text-white">
                <ShoppingCart className="cursor-pointer text-white" />{" "}
                {cartCount}
              </Link>
            </Button>
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
              {navLinks.map((navLink, idx: number) => (
                <Link
                  href={navLink.href}
                  onClick={() => setNavOpen(false)}
                  key={idx}
                  className=""
                >
                  <Card className="relative h-20 overflow-hidden">
                    <Image
                      src={navLink.bgImage}
                      alt={navLink.name}
                      height={1000}
                      width={1000}
                      className="h-full w-full object-cover object-top absolute"
                    />
                    <div className="absolute p-5 bg-black/50 w-full h-full">
                      <h1 className="text-xl font-semibold text-white">
                        {navLink.name}
                      </h1>
                      <p className="text-muted-foreground">
                        {navLink.description}
                      </p>
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

export default Navbar;
