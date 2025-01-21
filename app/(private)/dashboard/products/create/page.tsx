"use client";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { SelectValue } from "@radix-ui/react-select";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const CreateProduct = () => {
  const form = useForm();

  const handleSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="mt-24 flex items-center gap-5">
        <Button variant={"outline"} asChild>
          <Link href={"/dashboard/products"}>
            <ChevronLeft />
          </Link>
        </Button>
        <p className="text-xl font-medium tracking-tight">New Product</p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="text-xl">Create Product</CardTitle>
          <CardDescription>
            Fill out the essential information to create your product
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="space-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Ex: Gym Hoodie"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Gym hoodie comfortable...."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} placeholder="$50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="featured"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Featured</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Featured</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultOpen={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="images"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Image(s)</FormLabel>
                      <FormControl>
                        <UploadDropzone
                          {...field}
                          endpoint={"imageUploader"}
                          onClientUploadComplete={(res) => {
                            alert("finished uploading");
                          }}
                          onUploadError={() => {
                            alert("error uploading images");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full" type="submit">
                Create Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateProduct;
