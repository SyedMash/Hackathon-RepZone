import { ship } from "@/lib/ship-engine";
import { client } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  const { userId } = await auth();

  try {
    await client
      .patch(userId!)
      .set({
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 ? data.addressLine2 : "",
        country: data.country,
        state: data.state,
        city: data.city,
        phone: data.phone,
      })
      .commit();
  } catch (error) {
    console.log("Error Updating Address", error);
  }

  try {
    const rates = await ship.getRatesWithShipmentDetails({
      shipment: {
        customs: { contents: "sample", nonDelivery: "return_to_sender" },
        validateAddress: "validate_and_clean",
        carrierId: "se-1553954",
        serviceCode: "fedex_international_priority_express",
        shipTo: {
          name: data.name,
          addressLine1: data.addressLine1,
          cityLocality: data.city,
          stateProvince: data.state,
          postalCode: data.zipcode,
          countryCode: data.country,
          phone: data.phone,
          addressResidentialIndicator: "yes",
        },
        shipFrom: {
          name: "RepZone",
          addressLine1: "5819 W Belmont Ave",
          cityLocality: "Chicago",
          stateProvince: "IL",
          postalCode: "60634",
          countryCode: "US",
          phone: "5555554444",
          addressResidentialIndicator: "yes",
        },
        packages: [
          {
            weight: {
              value: 1.5,
              unit: "pound",
            },
          },
        ],
        shipDate: new Date(Date.now()),
      },
      rateOptions: {
        carrierIds: ["se-1553954"],
      },
    });
    console.log(rates);
    return NextResponse.json(rates, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
