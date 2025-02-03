import React from "react";
import ReviewCard from "./review-card";
import { client } from "@/sanity/lib/client";

interface Review {
  title: string;
  content: string;
}

const getReviewData = async () => {
  const query = `*[_type == "review"]{
  title,
  content
  }`;
  return client.fetch(query);
};

const Review = async () => {
  const reviews: Review[] = await getReviewData();

  return (
    <section className="container mx-auto px-2 xl:px-0 min-h-[50vh] ">
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center font-semibold mt-12">
        REVIEWS
      </h1>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-12">
          {reviews.map((review, idx) => (
            <ReviewCard
              title={review.title}
              content={review.content}
              key={idx}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-lg mt-2">Currently No Reviews</h1>
      )}
    </section>
  );
};

export default Review;
