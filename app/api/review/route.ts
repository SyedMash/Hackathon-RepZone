import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const reviewData = {
      title: body.data.title,
      content: body.data.content,
      ofProduct: {
        _ref: body._id,
        _type: "reference",
      },
    };
    await client.create({ _type: "review", ...reviewData });
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
