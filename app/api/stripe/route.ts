import { generateKey } from "@/constants";
import { ship } from "@/lib/ship-engine";
import { stripe } from "@/lib/stripe";
import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import express from 'express';


const stripeWebhookSecret = process.env.NEXT_STRIPE_SECRET_WEBHOOK as string;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      stripeWebhookSecret
    );
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const onlyIds = JSON.parse(session.metadata?.cartItemsId || "[]");

      console.log(onlyIds);

      const orderData = {
        customer: {
          _ref: session.metadata?.userId,
          _type: "reference",
        },
        totalPrice: (session?.amount_total as number) / 100,
        status: session.payment_status,
        products: onlyIds.map((id: string) => ({
          _ref: id,
          _type: "reference",
          _key: generateKey(),
        })),
      };

      try {
        await client.create({ _type: "order", ...orderData });
        console.log("Order created successfully!");
      } catch (error: any) {
        console.error("Failed to create order in Sanity:", error.message);
        return NextResponse.json(
          { error: "Failed to create order" },
          { status: 500 }
        );
      }

      //creating label with rateId
      try {
        const label = await ship.createLabelFromRate({
          rateId: session?.metadata?.rateId!,
        });
        console.log(label);
        return NextResponse.json("success", { status: 200 });
      } catch (error) {
        return NextResponse.json("[POST LABEL]", { status: 401 });
      }

      break;
    }
    default: {
      console.log(`Unhandled event type: ${event.type}`);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// Middleware to capture raw body for webhook
export async function middleware(req: NextRequest) {
  const sig = req.headers.get("Stripe-Signature");

  let event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig as string, stripeWebhookSecret);
  } catch (error: any) {
    console.error("Webhook signature verification failed.", error.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
