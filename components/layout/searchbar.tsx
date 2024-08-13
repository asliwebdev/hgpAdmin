"use client"

import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";
import { Table } from "@tanstack/table-core";

interface SearchBarProps<D> {
  table: Table<D>;
  searchedBy: string;
}

export function Searchbar<D>(props: SearchBarProps<D>) {

  return (
    <div className={"relative"}>
      <Input
        placeholder="Search..."
        value={(props.table.getColumn(props.searchedBy)?.getFilterValue() as string) ?? ""}
        onChange={(event) => props.table.getColumn(props.searchedBy)?.setFilterValue(event.target.value)
        }
        className="max-w-sm peer block rounded-md border border-secondary dark:border-dark-secondary py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <LuSearch
        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-dark-secondary" />
    </div>
  )
}