import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_API!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});
