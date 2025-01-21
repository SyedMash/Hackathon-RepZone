import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: { productId: string } = await req.json();
  try {
    await client.delete(body.productId);
    return NextResponse.json({ success: "product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
