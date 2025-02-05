import { generateKey } from "@/constants";
import { ship } from "@/lib/ship-engine";
import { stripe } from "@/lib/stripe";
import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text(); // ✅ Read raw body
  const signature = req.headers.get("Stripe-Signature");

  console.log("🔹 Webhook request received:", body);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
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

      console.log("✅ Session Data:", session);
      console.log("✅ Cart Item IDs:", onlyIds);

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
        console.log("✅ Order created successfully!");
      } catch (error: any) {
        console.error("🚨 Failed to create order in Sanity:", error.message);
        return NextResponse.json(
          { error: "Failed to create order" },
          { status: 500 }
        );
      }

      // ✅ Fix: Ensure this block executes fully
      try {
        const label = await ship.createLabelFromRate({
          rateId: session?.metadata?.rateId!,
        });
        console.log("✅ Shipping label created:", label);
      } catch (error) {
        console.error("🚨 Failed to create label:", error);
      }

      return NextResponse.json("success", { status: 200 });
    }

    default:
      console.log(`⚠️ Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
