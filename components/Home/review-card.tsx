import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

const ReviewCard = () => {
  return (
    <Card className="flex gap-2 h-48">
      <div className="h-full w-48 rounded-lg overflow-hidden">
        <Image
          src={"/images/pc/1.jpg"}
          alt="image"
          height={1000}
          width={1000}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-2 p-3">
        <h1 className="text-xl font-bold">review title</h1>
        <p>stars</p>
        <p>content</p>
      </div>
    </Card>
  );
};

export default ReviewCard;
