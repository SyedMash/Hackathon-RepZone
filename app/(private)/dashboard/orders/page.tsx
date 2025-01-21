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

const tableData = [
  {
    customer: "Mashhood",
    email: "mashrtx7@gmail.com",
    type: "ggs",
    status: "paid",
    date: Date.now(),
    amount: "$1234",
  },
  {
    customer: "Hussain",
    email: "pro@gmail.com",
    type: "ggs",
    status: "paid",
    date: Date.now(),
    amount: "$1500",
  },
];

const OrdersPage = () => {
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
              {tableData.map((data, idx) => (
                <TableRow key={idx}>
                  <TableCell>{data.customer}</TableCell>
                  <TableCell>{data.type}</TableCell>
                  <TableCell>{data.status}</TableCell>
                  <TableCell>{data.date}</TableCell>
                  <TableCell className="text-right">{data.amount}</TableCell>
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
