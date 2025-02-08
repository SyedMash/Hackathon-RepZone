import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/components/cart";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { cartDetails } = body;
  const { userId } = await auth();
  const cart: Product[] = cartDetails;
  const cartArray = Object.values(cart ?? {});

  const onlyIds = cartArray.map((item: any) => item.id);

  if (cartArray.length > 0) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cartArray.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Number(item.price) * 100,
          product_data: {
            name: item.name,
            images: [item.image],
          },
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: "https://hackathon-rep-zone.vercel.app/payment/success",
      cancel_url: "https://hackathon-rep-zone.vercel.app/payment/cancel",
      metadata: {
        userId: userId,
        cartItemsId: JSON.stringify(onlyIds),
        rateId: body.rateId,
      },
    });
    return NextResponse.json({ sessionId: session.id });
  }
}
