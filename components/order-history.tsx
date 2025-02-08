import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface OrderHistoryProps {
  orders: any[];
}

interface Order {
  _createdAt: string;
  status: string;
  totalPrice: string;
}

const OrderHistory = ({ orders }: OrderHistoryProps) => {
  return (
    <section className="container mx-auto px-2 xl:px-0">
      <h1 className="mt-12 text-xl">Order History</h1>
      <p className="text-sm text-muted-foreground">
        View your order history and manage your orders
      </p>
      <div className="mt-6 flex flex-col gap-2">
        {orders.length === 0 ? (
          <>
            <p>You have no orders</p>
          </>
        ) : (
          <>
            {orders.map((order: Order, idx: number) => (
              <Card key={idx}>
                <CardHeader>
                  <CardDescription>Order number: {"later"}</CardDescription>
                  <CardTitle className="text-xl">
                    Order: {new Date(order._createdAt).toLocaleString()}
                  </CardTitle>
                  <div className="flex items-center gap-12">
                    <p className="text-muted-foreground">
                      Total Price:{" "}
                      <span className="text-black dark:invert">
                        ${order.totalPrice}
                      </span>
                    </p>
                    <p className="text-muted-foreground">
                      Status:{" "}
                      <span className="text-black dark:invert">
                        {order.status}
                      </span>
                    </p>
                  </div>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default OrderHistory;
