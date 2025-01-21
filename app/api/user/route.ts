import { client } from "@/lib/client";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: { userId: string } = await req.json();
  const ct = await clerkClient();

  const user = await ct.users.getUser(body.userId);

  const query = `*[_type == "customer" && _id == "${body.userId}"][0]`;
  const existingCustomer = await client.fetch(query, {
    id: body.userId,
  });

  if (existingCustomer) {
    return NextResponse.json({ error: "user already exist" });
  }

  const userData = {
    _id: body.userId,
    email: user.emailAddresses[0].emailAddress,
    name: user.fullName,
  };

  const newUser = await client.create({ _type: "customer", ...userData });

  return NextResponse.json({ newUser });
}
