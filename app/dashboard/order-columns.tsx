"use client"

import { Order } from "@/types";
import { makeDelivered } from "@/lib/actions";
import { ColumnDef } from "@tanstack/react-table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {toast} from "sonner";

export const orderColumns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-center">ID</div>,
        cell: ({ row }) => (
            <div className="text-center font-medium">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "orderDate",
        header: () => <div className="text-center">Date</div>,
        cell: ({ row }) => {
            const dateValue = row.getValue<string>("orderDate");
            const date = new Date(dateValue);

            if (isNaN(date.getTime())) {
                return <div className="text-center">Invalid Date</div>;
            }

            const formattedDate = date.toLocaleDateString('en-GB');
            return (
                <div className="text-center">
                    {formattedDate}
                </div>
            );
        },
    },
    {
        accessorKey: "userId",
        header: () => <div className="text-center">User ID</div>,
        cell: ({ row }) => (
            <div className="text-center font-medium">{row.getValue("userId")}</div>
        ),
    },
    {
        accessorKey: "orderAddress",
        header: () => <div className="text-center">Address</div>,
        cell: ({ row }) => (
            <div className="text-center font-medium">{row.getValue("orderAddress")}</div>
        ),
    },
    {
        accessorKey: "delivered",
        header: () => <div className="text-center">Delivered</div>,
        cell: ({ row }) => {
            const delivered = row.getValue("delivered") as boolean;
            return (
                <div className="text-center">
          <span
              className={`font-medium ${
                  delivered ? "text-green-600" : "text-red-600"
              }`}
          >
            {delivered ? "True" : "False"}
          </span>
                </div>
            );
        },
    },
    {
        accessorKey: "action",
        header: () => <div className="text-center">Action</div>,
        cell: ({row}) => {
            const delivered = row.getValue("delivered") as boolean;
            const userId = row.getValue("userId") as number;
            const address = row.getValue("orderAddress") as string;
            const handleActionClick = async () => {
                try {
                    const response = await makeDelivered(Number(userId));
                    if (response?.errorMessage) {
                        toast.error(response.errorMessage);
                        console.error(response.errorMessage);
                    }
                } catch (error) {
                    console.error("An error occurred while making the delivery:", error);
                }
            };

            return (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className="w-full text-center">
                            <button
                                className={`text-white px-4 py-1 font-semibold rounded ${
                                    delivered ? "hidden" : "bg-green-500 hover:bg-green-600 transition-colors duration-300"
                                }`}
                            >
                                {!delivered && "delivered"}
                            </button>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently make this order delivered to user with address: <span className="text-black font-bold ml-2 text-base">{address}</span>.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex gap-x-2">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleActionClick}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
        },
    },
];

