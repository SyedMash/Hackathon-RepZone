import React from "react";
import ReviewCard from "./review-card";

const Review = () => {
  return (
    <section className="container mx-auto px-2 xl:px-0 min-h-[50vh] ">
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center font-semibold mt-12">
        REVIEWS
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-12">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </section>
  );
};

export default Review;
