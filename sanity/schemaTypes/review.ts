/* eslint-disable import/no-anonymous-default-export */
export default {
  name: "review",
  type: "document",
  title: "Reviews",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    { name: "image", type: "image", title: "Image" },
    { name: "content", type: "text", title: "content" },
    {
      name: "ofProduct",
      type: "reference",
      title: "Of Product",
      to: [{ type: "product" }],
    },
  ],
};
