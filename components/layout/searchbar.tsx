"use client"

import { Input } from "@/components/ui/input";
import { LuChevronDown } from "react-icons/lu";
import { MdOutlineCheck } from "react-icons/md";
import { Table } from "@tanstack/table-core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface Field {
  key: string;
  label: string;
}

const fields: Field[] = [
  { key: "email", label: "Email" },
  { key: "enabled", label: "Enabled" },
  { key: "phone", label: "Phone Number" },
  { key: "address", label: "Address" },
  { key: "firstname", label: "First Name" },
  { key: "lastname", label: "Last Name" },
  { key: "deviceId", label: "Device ID" },
  { key: "gender", label: "Gender" },
  { key: "action", label: "Action" },
];

interface SearchBarProps<D> {
  table: Table<D>;
}

export function Searchbar<D>(props: SearchBarProps<D>) {
  const [searchedBy, setSearchedBy] = useState("email");

  return (
    <div className={"relative"}>
      <Input
        placeholder={`Search by ${searchedBy}...`}
        value={(props.table.getColumn(searchedBy)?.getFilterValue() as string) ?? ""}
        onChange={(event) => props.table.getColumn(searchedBy)?.setFilterValue(event.target.value)
        }
        className="max-w-sm peer block rounded-md border border-secondary dark:border-dark-secondary py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex items-center">
          <button type="button">
           <LuChevronDown className="cursor-pointer absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-dark-secondary" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start">
         <DropdownMenuLabel>Choose what to search</DropdownMenuLabel>
         <DropdownMenuSeparator />
         <DropdownMenuGroup>
          {
            fields.map(field => (
              <DropdownMenuItem key={field.key} onClick={() => setSearchedBy(field.key)} className="flex items-center justify-between">{field.label} {searchedBy === field.key && <MdOutlineCheck />}</DropdownMenuItem>
            ))
          }
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}