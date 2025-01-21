"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";

const shippingSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  addressLine1: z.string({ message: "Required Field" }),
  addressLine2: z.string().optional(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  zipcode: z.string(),
  phone: z.string(),
});

interface UserData {
  name: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  phone: string;
  zipcode?: string;
}

const ProfilePage = ({
  name,
  addressLine1,
  addressLine2,
  city,
  country,
  email,
  phone,
  state,
  zipcode,
}: UserData) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: name,
      email: email,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      country: country,
      phone: phone,
      state: state,
      zipcode: "",
    },
  });

  // console.log(userData);

  const handleSubmit = async (data: z.infer<typeof shippingSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) throw new Error("Something went wrong");
      const profileInfo = response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-2 xl:px-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-24 space-y-4"
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
                      placeholder="Ex: Mashal"
                      {...field}
                      required
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Mashal"
                      {...field}
                      disabled={true}
                      required
                      type="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="addressLine1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type="text" required />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="addressLine2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2 (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      type="text"
                      required={false}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2 w-full">
              <FormField
                name="country"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Country Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: US UK PK ..."
                        {...field}
                        type="text"
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="state"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="NY" {...field} type="text" required />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="New York"
                        {...field}
                        type="text"
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="zipcode"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="60606"
                        {...field}
                        type="text"
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="55554444"
                      {...field}
                      type="number"
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>Update Details</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfilePage;
