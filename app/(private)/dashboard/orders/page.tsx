import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { client } from "@/sanity/lib/client";

interface Order {
  customerName: string;
  status: string;
  _createdAt: string;
  totalPrice: number;
}

export const dynamic = "force-dynamic";
export const revalidate = 30;

const getOrderData = async () => {
  const query = `*[_type == "order"]{
  "customerName": customer->name,
    status,
    _createdAt,
    totalPrice
}`;
  return client.fetch(query);
};

const OrdersPage = async () => {
  const orders: Order[] = await getOrderData();
  return (
    <>
      <Card className="mt-24">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Orders</CardTitle>
          <CardDescription>All the orders you have got</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Your Orders</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, idx) => (
                <TableRow key={idx}>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{"null"}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order._createdAt}</TableCell>
                  <TableCell className="text-right">
                    ${order.totalPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default OrdersPage;
