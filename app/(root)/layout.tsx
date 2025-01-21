"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import NewLetter from "@/components/Home/news-letter";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isSignedIn } = useUser();
  useEffect(() => {
    if (user && isSignedIn) {
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });
    }
  }, [user, isSignedIn]);

  return (
    <>
      <Navbar />
      {children}
      <NewLetter />
      <Footer />
    </>
  );
}
