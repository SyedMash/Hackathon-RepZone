import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

interface SlideContentProps {
  title: string;
  description: string;
  slug: string;
  href: string;
}

const SlideShowProductCard = ({
  title,
  description,
  slug,
  href,
}: SlideContentProps) => {
  return (
    <Card className="flex flex-col md:flex-row bg-transparent z-10 border-none shadow-2xl backdrop-blur-s,">
      <div className="p-2 lg:p-3 xl:p-5 max-w-96 text-white space-y-3">
        <h1 className="text-2xl font-semibold">{title} &rarr;</h1>
        <p className="text-muted-foreground text-wrap">{description}</p>
        <div className="flex justify-between">
          <p>$150</p>
          <Link href={href}>
            <Button>Shop Now</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default SlideShowProductCard;
