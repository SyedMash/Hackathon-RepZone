/* eslint-disable import/no-anonymous-default-export */
export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    { name: "price", title: "Price", type: "number" },
    { name: "size", title: "Sizes", type: "array", of: [{ type: "string" }] },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "subcategory",
      title: "Sub Category",
      type: "reference",
      to: [{ type: "subcategory" }],
    },
    { name: "discountedPrice", title: "Discounted Price", type: "number" },
    { name: "stock", title: "Stock", type: "number" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
    { name: "hot", title: "Hot Selling", type: "boolean" },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    },
  ],
};
