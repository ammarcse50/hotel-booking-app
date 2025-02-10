"use client";
import { ArrowUpDown, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Room } from "@/app/services/room";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteRoom: (id: string) => void;
  }
}

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column?.toggleSorting(column?.getIsSorted() === "asc")}
        >
          Room Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row?.getValue("name") ?? " ";
      if (name === undefined || name === null) {
        return null;
      }

      return <div className="lowercase">{name}</div>;
    },
    sortingFn: (rowA: Row<Room>, rowB: Row<Room>) =>
      rowA?.original?.name.localeCompare(rowB?.original?.name),
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column?.toggleSorting(column?.getIsSorted() === "asc")}
        >
          Capacity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row: Row<Room>, id, filters: string[]) => {
      const roomCapacity = row?.original?.capacity;
      let isMatched = false;

      filters.map((value) => {
        const values = value.split("-");
        const min = parseInt(values[0]);
        const max = parseInt(values[1]);
        if (roomCapacity >= min && (isNaN(max) || max >= roomCapacity)) {
          isMatched = true;
        }
      });
      return isMatched;
    },
    sortingFn: (rowA, rowB) => {
      const capacityA = rowA.original.capacity;
      const capacityB = rowB.original.capacity;
      return capacityA - capacityB;
    },
  },

  {
    accessorKey: "id",
    header: "Calendar Id",
    size: 50,
    enableHiding: true,
  },
  {
    id: "delete",
    enableHiding: false,
    cell: function Cell({ row, table }) {
      const mroom = row.original;

      const handleDelete = () => {
        table.options.meta?.deleteRoom(mroom.id);
      };
      return (
        <Trash
          className="block py-2 px-3 md:p-0 text-gray-400 ml-2 h-4 w-4"
          onClick={handleDelete}
        />
      );
    },
  },
];
