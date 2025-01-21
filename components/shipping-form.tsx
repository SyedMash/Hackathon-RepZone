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
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "./ui/card";

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

interface ShippingFormsProps {
  onSelectRates: (rateId: string) => void;
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

const ShippingForm = ({
  onSelectRates,
  addressLine1,
  addressLine2,
  city,
  country,
  email,
  name,
  phone,
  state,
  zipcode,
}: ShippingFormsProps) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [ratesData, setRatesData] = useState<any>({});
  const [selected, setSelected] = useState({
    rateId: "",
  });

  console.log(ratesData);

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
      zipcode: zipcode,
    },
  });

  const handleSubmit = async (data: z.infer<typeof shippingSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/shipping/rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) throw new Error("Something went wrong");
      const ratesInfo = response.json();
      ratesInfo.then((ratesInfo) => setRatesData(ratesInfo));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full h-2/4 lg:w-2/4 lg:h-full space-y-4"
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
                    <Input placeholder="" {...field} type="text" />
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
            Get Rates
          </Button>
        </form>
      </Form>
      <div className="w-full h-2/4 lg:w-2/4 lg:h-full">
        <h1 className="text-right text-lg font-medium">Shipping Information</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {ratesData?.rateResponse?.rates?.map((item: any, idx: number) => (
                <Card
                  key={idx}
                  className={`p-3 cursor-pointer hover:opacity-50 ${item.rateId === selected.rateId ? "opacity-50" : "opacity-100 "}`}
                  onClick={() => {
                    setSelected({ rateId: item.rateId });
                    onSelectRates(item.rateId);
                  }}
                >
                  <h1 className="font-medium uppercase">{item.carrierCode}</h1>
                  <h1>Price: ${item.shippingAmount.amount}</h1>
                  <p>Delivery Days: {item.deliveryDays}</p>
                  <p>
                    Est Delivery Date:{" "}
                    {item.estimatedDeliveryDate.split("T00:00:00Z")}
                  </p>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
