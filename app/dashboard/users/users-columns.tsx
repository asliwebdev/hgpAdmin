"use client"

import { User } from "@/types";
import { userAction } from "@/lib/actions";
import { ColumnDef } from "@tanstack/react-table"
import {toast} from "sonner";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "enabled",
    header: () => <div className="text-center">Enabled</div>,
    cell: ({ row }) => {
      const enabled = row.getValue("enabled") as boolean;
      return (
        <div className="text-center">
          <span
            className={`font-medium ${
              enabled ? "text-green-600" : "text-red-600"
            }`}
          >
            {enabled ? "True" : "False"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-left">Phone Number</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: () => <div className="text-left">Location</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "firstname",
    header: () => <div className="text-left">First Name</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("firstname")}</div>
    ),
  },
  {
    accessorKey: "lastname",
    header: () => <div className="text-left">Last Name</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("lastname")}</div>
    ),
  },
  {
    accessorKey: "deviceId",
    header: () => <div className="text-left">Device ID</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("deviceId")}</div>
    ),
  },
  {
    accessorKey: "gender",
    header: () => <div className="text-center">Gender</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("gender")}</div>
    ),
  },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const enabled = row.getValue("enabled") as boolean;
      const userId = row.original.id;
      const handleActionClick = async () => {
        const response = await userAction({ userId, enabled: !enabled });
        if (response?.errorMessage) {
          toast.error(response.errorMessage);
          console.error(response.errorMessage);
        }
      };

      return (
          <div className="w-full text-center">
            <button
                onClick={handleActionClick}
                className={`text-white px-4 py-1 rounded font-semibold ${
                    enabled ? "bg-red-500" : "bg-green-500"
                }`}
            >
              {enabled ? "disable" : "enable"}
            </button>
          </div>

      );
    },
  },
];

