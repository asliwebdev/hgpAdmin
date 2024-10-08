"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { ScrollArea } from "../ui/scroll-area"
import { useState } from "react"
import { Searchbar } from "./searchbar"
import { Filter } from "./filters"
import { AddAdmin } from "./dialog"
import {Field} from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  hasAddButton?: boolean,
  fields: Field[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  hasAddButton,
  fields
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div>
      <div className="flex justify-between mb-4">
       <Searchbar<TData> table={table} fields={fields} />
       <div className="flex items-center gap-x-4">
        <Filter table={table} />
         {hasAddButton && <AddAdmin />}
       </div>
      </div>
    <ScrollArea className="rounded-md border h-[57vh]">
      <Table>
        <TableHeader className="bg-[#f7f8fa]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
    </div>
  )
}
