"use client";
import { Button } from "@/components/ui/button";
import React from "react";

interface ErrorProps {
  error: string;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div className="flex items-center justify-center">
      <p>{error}</p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
};

export default Error;
