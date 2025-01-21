/* eslint-disable import/no-anonymous-default-export */
export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "customer",
      title: "Customer",
      type: "reference",
      to: [{ type: "customer" }],
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    },
    { name: "totalPrice", title: "Total Price", type: "number" },
    { name: "status", title: "Status", type: "string" },
    { name: "createdAt", title: "Created At", type: "datetime" },
  ],
};
