/* eslint-disable @next/next/no-img-element */
import DeleteAll from "@/components/dashboard/delete-all";
import DeleteButton from "@/components/dashboard/delete-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { client } from "@/sanity/lib/client";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const getData = async () => {
  const query = `*[_type == "product"]{
    name,
    price,
    stock,
    _createdAt,
    _id,
    "imageUrl": images[0].asset->url
}`;
  return client.fetch(query);
};

const ProductPage = async () => {
  const products = await getData();

  return (
    <>
      <div className="mt-24 flex items-center justify-between">
        <DeleteAll />
        <Link
          href={
            "http://localhost:3000/studio/structure/product;af51259b-5e50-4731-9c2e-ec26fab11066%2Ctemplate%3Dproduct"
          }
        >
          <Button className="flex items-center gap-2">
            <PlusCircle />
            Add Product
          </Button>
        </Link>
      </div>
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">PRODUCTS</CardTitle>
          <CardDescription>All the products in RepZone</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Products</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {products.map((product: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell>
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="h-16 w-16 object-cover"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>active</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product._createdAt}</TableCell>
                <TableCell className="text-right">
                  <DeleteButton productId={product._id} />
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductPage;
