"use client";
import React, { useState } from "react";
import ReviewCard from "../Home/review-card";
import { Accordion } from "../ui/accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PortableText } from "next-sanity";

interface Product {
  name: string;
  description: any;
  price: string;
  images: string[] | [];
  size: string[];
  category: string;
  stock: string;
  _id: string;
  slug: string;
  reviews: any[];
}

const CustomerSatisfaction = ({
  name,
  description,
  price,
  category,
  _id,
  images,
  slug,
  stock,
  size,
  reviews,
}: Product) => {
  const [showFeatures, setShowFeatures] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<{ title: string; content: string }>();
  const { toast } = useToast();

  const handleReviewSubmit = async (data: {
    title: string;
    content: string;
  }) => {
    setLoading(true);
    try {
      await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, _id }),
      }).then(() => {
        toast({
          title: "Review Submitted Successfully",
        });
      });
    } catch (error) {
      console.log(error);
      // later
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <>
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h1
            onClick={() => {
              setShowFeatures(true);
              setShowReviews(false);
              setShowFAQs(false);
              setShowShipping(false);
            }}
            className={`text-center w-full transition-all ease-linear duration-300 cursor-pointer lg:text-xl pb-1 ${
              showFeatures &&
              "border-b border-black dark:border-white font-semibold"
            }`}
          >
            Features
          </h1>
          <h1
            onClick={() => {
              setShowReviews(true);
              setShowFeatures(false);
              setShowFAQs(false);
              setShowShipping(false);
            }}
            className={`w-full text-center cursor-pointer lg:text-xl transition-all duration-300 pb-1 ${
              showReviews &&
              "border-b border-black dark:border-white font-semibold"
            }`}
          >
            Reviews
          </h1>
          <h1
            onClick={() => {
              setShowFAQs(true);
              setShowFeatures(false);
              setShowReviews(false);
              setShowShipping(false);
            }}
            className={`w-full text-center cursor-pointer lg:text-xl transition-all duration-300 pb-1 ${
              showFAQs &&
              "border-b border-black dark:border-white font-semibold"
            }`}
          >
            FAQs
          </h1>
          <h1
            onClick={() => {
              setShowShipping(true);
              setShowFeatures(false);
              setShowReviews(false);
              setShowFAQs(false);
            }}
            className={`w-full text-center cursor-pointer lg:text-xl transition-all duration-300 pb-1 ${
              showShipping &&
              "border-b border-black dark:border-white font-semibold"
            }`}
          >
            Shipping & Returns
          </h1>
        </div>

        <div className="mt-12 px-2 xl:px-0">
          {showFeatures && (
            <div className="prose prose-blue prose-lg dark:prose-invert max-w-none">
              <PortableText value={description} />
            </div>
          )}

          {showReviews && (
            <>
              <div className="flex items-center justify-end mb-4">
                <Button onClick={() => setOpenDialog(true)}>
                  Write Review
                </Button>
              </div>
              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {reviews.map(
                    (
                      review: { title: string; content: string },
                      idx: number
                    ) => (
                      <ReviewCard
                        key={idx}
                        title={review.title}
                        content={review.content}
                      />
                    )
                  )}
                </div>
              ) : (
                <>
                  <h1>Currently no reviews available for this product</h1>
                </>
              )}
            </>
          )}

          {showFAQs && (
            <div className="w-full">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="item-1"
                  className="border-t border-b py-5"
                >
                  <AccordionTrigger>Is it machine washable?</AccordionTrigger>
                  <AccordionContent>
                    Yes! It is machine washable
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="border-t border-b py-5"
                >
                  <AccordionTrigger>Is it stretchable?</AccordionTrigger>
                  <AccordionContent>Yes! It is stretchable</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          {showShipping && <>Shipping and returns</>}
        </div>
      </section>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <h1 className="text-lg font-semibold">Write Review</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleReviewSubmit)}
              className="space-y-4"
            >
              <div className="space-y-6">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="review title" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your Review"
                          {...field}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full" type="submit">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit Review"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerSatisfaction;
