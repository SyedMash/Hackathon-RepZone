import { generateKey } from "@/constants";
import { ship } from "@/lib/ship-engine";
import { stripe } from "@/lib/stripe";
import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("Stripe-Signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
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
      } catch (error: any) {
        console.error("Failed to create order in Sanity:", error.message);
        return NextResponse.json(
          { error: "Failed to create order" },
          { status: 500 }
        );
      }

      try {
        const label = await ship.createLabelFromRate({
          rateId: session?.metadata?.rateId!,
        });
        return NextResponse.json("success", { status: 200 });
      } catch (error: any) {
        return NextResponse.json("[POST LABEL]", { status: 401 });
      }
    }
    default: {
      console.log(`Unhandled event type: ${event.type}`);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
