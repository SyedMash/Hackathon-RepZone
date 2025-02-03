/* eslint-disable import/no-anonymous-default-export */
export default {
  name: "subcategory",
  title: "Subcategory",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
  ],
};
