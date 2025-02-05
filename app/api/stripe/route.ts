import { generateKey } from "@/constants";
import { ship } from "@/lib/ship-engine";
import { stripe } from "@/lib/stripe";
import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(body),
      signature as string,
      process.env.NEXT_STRIPE_SECRET_WEBHOOK as string
    );
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const onlyIds = JSON.parse(session.metadata?.cartItemsId || "[]");

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

    }
    default: {
      console.log(`Unhandled event type: ${event.type}`);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
