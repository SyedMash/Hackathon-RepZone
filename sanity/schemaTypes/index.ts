import { type SchemaTypeDefinition } from "sanity";
import order from "./order";
import product from "./product";
import category from "./category";
import customer from "./customer";
import review from "./review";
import subcategory from "./subcategory";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, order, category, subcategory, customer, review],
};
