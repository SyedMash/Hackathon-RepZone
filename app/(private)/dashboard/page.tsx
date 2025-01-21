import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client } from "@/lib/client";

import {
  DollarSign,
  ShirtIcon,
  ShoppingBag,
  User2,
  User2Icon,
} from "lucide-react";
import React from "react";

const getCustomerData = async () => {
  const query = `*[_type == "customer"]`;
  return client.fetch(query);
};

const getProductData = async () => {
  const query = `*[_type == "product"]`;
  return client.fetch(query);
};

const Dashboard = async () => {
  const customers = await getCustomerData();
  const products = await getProductData();

  const cardContent = [
    {
      title: "Total Revenue",
      value: "$100",
      description: "Based on 100 Charges",
      icon: DollarSign,
    },
    {
      title: "Total Sales",
      value: "+50",
      description: "Total sales on RepZone",
      icon: ShoppingBag,
    },
    {
      title: "Total Products",
      value: products.length,
      description: "Total products live on RepZone",
      icon: ShirtIcon,
    },
    {
      title: "Total Users",
      value: customers.length,
      description: "Total users signed up",
      icon: User2,
    },
  ];
  return (
    <section>
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-2 xl:gap-5">
        {cardContent.map((cc, idx: number) => (
          <Card key={idx} className="p-5">
            <div className="flex justify-between">
              <h1>{cc.title}</h1>
              <cc.icon className="text-red-800" />
            </div>
            <h1 className="text-3xl font-semibold">{cc.value}</h1>
            <p className="text-muted-foreground">{cc.description}</p>
          </Card>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Transactions
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Recent transactions on RepZone
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Recent Sales
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Recent sales on RepZone
            </CardDescription>
            <CardContent className="flex flex-col gap-4 pt-2 px-0 ">
              <div className="flex items-center gap-4">
                <User2Icon className="hidden sm:flex" />
                <div className="grid gap-1">
                  <h1>Mashhood Hussain</h1>
                  <p className="text-xs text-muted-foreground">
                    mashrtx7@gmail.com
                  </p>
                </div>
                <p className="ml-auto text-lg font-semibold">+$1,500</p>
              </div>
              <div className="flex items-center gap-4">
                <User2Icon className="hidden sm:flex" />
                <div className="grid gap-1">
                  <h1>Mashhood Hussain</h1>
                  <p className="text-xs text-muted-foreground">
                    mashrtx7@gmail.com
                  </p>
                </div>
                <p className="ml-auto text-lg font-semibold">+$1,500</p>
              </div>
              <div className="flex items-center gap-4">
                <User2Icon className="hidden sm:flex" />
                <div className="grid gap-1">
                  <h1>Mashhood Hussain</h1>
                  <p className="text-xs text-muted-foreground">
                    mashrtx7@gmail.com
                  </p>
                </div>
                <p className="ml-auto text-lg font-semibold">+$1,500</p>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
