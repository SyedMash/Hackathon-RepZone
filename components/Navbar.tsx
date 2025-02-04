"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import MobileNav from "./mob-nav";
import ListItem from "./ListItems";

import { AnimatePresence, motion } from "framer-motion";
import { ModeToggle } from "./toggle-theme";
import { CrossIcon, MenuIcon, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { navLinksMen, navLinksWomen } from "@/constants";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User className="h-5 w-5" />
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

  const handleNavMenu = () => {
    setNavOpen(false);
  };

  return (
    <>
      <motion.div
        className="w-full top-5 left-0 h-16 z-50 px-2 xl:px-0"
        initial={{ y: "-100%", opacity: "0" }}
        animate={{ y: "0%", opacity: "1" }}
      >
        <div className="h-full mx-auto md:max-w-[750px] lg:max-w-[1000px] 2xl:max-w-[1800px] flex items-center justify-between px-2">
          <Link href={"/"}>
            <Image
              src={"/images/pc/logowhite.png"}
              alt="logo"
              height={200}
              width={200}
              className="invert dark:invert-0"
            />
          </Link>
          {/* bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md */}
          <nav className="hidden lg:flex gap-5 items-center">
            <NavigationMenu className="">
              <NavigationMenuList className="flex items-center gap-2">
                <NavigationMenuItem className="">
                  <NavigationMenuTrigger title="">Men</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink
                          asChild
                          className="bg-[url(/images/banners/NAV_BAR.png)] bg-no-repeat bg-cover"
                        >
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md p-6"
                            href=""
                          ></Link>
                        </NavigationMenuLink>
                      </li>
                      {navLinksMen.map((navLink, idx: number) => (
                        <ListItem
                          href={navLink.href}
                          title={navLink.name}
                          key={idx}
                        >
                          {navLink.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Women</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink
                          asChild
                          className="bg-[url(/images/banners/NAV_BAR_WOMEN.png)] bg-no-repeat bg-cover"
                        >
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md p-6"
                            href=""
                          ></Link>
                        </NavigationMenuLink>
                      </li>
                      {navLinksWomen.map((navLink, idx: number) => (
                        <ListItem
                          href={navLink.href}
                          title={navLink.name}
                          key={idx}
                        >
                          {navLink.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Link href={"/cart"} className="px-2 flex items-center gap-2">
              <ShoppingCart className="cursor-pointer text-black h-4 w-4 dark:text-white" />{" "}
              <span className="text-sm">{cartCount}</span>
            </Link>
            <UserButton />

            <Button
              size={"icon"}
              variant={"outline"}
              className="lg:hidden"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? (
                <CrossIcon className="rotate-45 text-white"></CrossIcon>
              ) : (
                <MenuIcon className="" />
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
            <CrossIcon
              className="absolute rotate-45 top-14 right-5 cursor-pointer"
              onClick={() => setNavOpen(false)}
            />
            <div className="mt-32 flex flex-col gap-6">
              <MobileNav onClickLink={handleNavMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
