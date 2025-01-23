import React from "react";
import { Button } from "../ui/button";
import { client } from "../../sanity/lib/client";

const DeleteAll = () => {
  const handleDelete = async () => {
    const query = `*[_type == "product"]`;
    await client.delete({ query });
  };
  return (
    <Button className="bg-red-800" onClick={handleDelete}>
      Delete All
    </Button>
  );
};

export default DeleteAll;
