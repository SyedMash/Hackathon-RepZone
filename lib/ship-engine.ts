import ShipEngine from "shipengine";

export const ship = new ShipEngine(
  process.env.NEXT_PUBLIC_SHIPENGINE_API_KEY as string
);
