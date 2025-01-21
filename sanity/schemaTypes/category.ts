/* eslint-disable import/no-anonymous-default-export */
export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
  ],
};
