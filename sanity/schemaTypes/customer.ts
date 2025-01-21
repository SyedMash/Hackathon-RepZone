/* eslint-disable import/no-anonymous-default-export */
export default {
  name: "customer",
  title: "Customer",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "addressLine1", title: "Address Line 1", type: "string" },
    { name: "addressLine2", title: "Address Line 2", type: "string" },
    { name: "country", title: "Country", type: "string" },
    { name: "state", title: "State", type: "string" },
    { name: "city", title: "City", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
  ],
};
