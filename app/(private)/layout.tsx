"use client";


import "../globals.css";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { useClerk, useUser } from "@clerk/nextjs";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded)
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">VERIFYING...</h1>
      </div>
    );

  if (!user) {
    console.log("User is undefined");
    return signOut({ redirectUrl: "/" });
  }

  if (!Array.isArray(user.emailAddresses) || user.emailAddresses.length === 0) {
    console.log("Email addresses are not defined or empty");
    return signOut({ redirectUrl: "/" });
  }

  if (user.emailAddresses[0].emailAddress !== "technologistpro7@gmail.com") {
    console.log("Email address does not match");
    return signOut({ redirectUrl: "/" });
  }

  if (
    !user ||
    user.emailAddresses[0].emailAddress !== "technologistpro7@gmail.com"
  ) {
    return signOut({ redirectUrl: "/" });
  }

  return (
    <div className="container mx-auto px-2 xl:px-0">
      <DashboardNavbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
