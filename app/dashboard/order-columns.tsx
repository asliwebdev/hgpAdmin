"use client"

import { Order } from "@/types";
import { UserAction } from "@/lib/actions";
import { ColumnDef } from "@tanstack/react-table"

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
    // {
    //     accessorKey: "action",
    //     header: () => <div className="text-center">Action</div>,
    //     cell: ({row}) => {
    //         const enabled = row.getValue("enabled") as boolean;
    //         const userId = row.original.id;
    //         const handleActionClick = () => {
    //             UserAction({ userId, enabled: !enabled });
    //         };
    //
    //         return (
    //             <button
    //                 onClick={handleActionClick}
    //                 className={`text-white px-2 py-1 rounded ${
    //                     enabled ? "bg-red-500" : "bg-green-500"
    //                 }`}
    //             >
    //                 {enabled ? "disable" : "enable"}
    //             </button>
    //         );
    //     },
    // },
];

