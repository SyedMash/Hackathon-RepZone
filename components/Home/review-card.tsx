import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

interface ReviewCardProps {
  title: string;
  content: string;
}

const ReviewCard = ({ title, content }: ReviewCardProps) => {
  return (
    <Card className="flex gap-2 min-h-48 max-w-[600px] overflow-hidden">
      <div className="h-full w-64 rounded-lg overflow-hidden">
        <Image
          src={"/images/pc/1.jpg"}
          alt="image"
          height={1000}
          width={1000}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-2 p-3">
        <h1 className="text-xl font-bold">{title}</h1>
        <p>stars</p>
        <p className="text-wrap">{content}</p>
      </div>
    </Card>
  );
};

export default ReviewCard;
