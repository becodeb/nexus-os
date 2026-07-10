import { useMemo, useState } from "react";
import {
  useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel,
  getPaginationRowModel, flexRender, type ColumnDef, type SortingState,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Client } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ClientStatusBadge } from "@/components/shared/status-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency, initials } from "@/lib/utils";

export function ClientsTable({ data }: { data: Client[] }) {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: "company",
        header: "Empresa",
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-base-hover text-xs font-semibold text-ink-secondary">
              {row.original.logo}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink-primary">{row.original.company}</p>
              <p className="truncate text-xs text-ink-tertiary">{row.original.industry}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "contact",
        header: "Contacto",
        cell: ({ row }) => (
          <div>
            <p className="text-sm text-ink-primary">{row.original.contact}</p>
            <p className="text-xs text-ink-tertiary">{row.original.contactEmail}</p>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => <ClientStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "lastInteraction",
        header: "Última interacción",
        cell: ({ row }) => <span className="numeric text-sm text-ink-secondary">{row.original.lastInteraction}</span>,
      },
      {
        accessorKey: "owner",
        header: "Responsable",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={row.original.ownerAvatar} />
              <AvatarFallback className="text-[9px]">{initials(row.original.owner)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-ink-secondary">{row.original.owner}</span>
          </div>
        ),
      },
      {
        accessorKey: "value",
        header: "Valor",
        cell: ({ row }) => <span className="numeric text-sm font-medium text-ink-primary">{formatCurrency(row.original.value)}</span>,
      },
      {
        id: "tags",
        header: "Etiquetas",
        cell: ({ row }) => (
          <div className="flex gap-1">
            {row.original.tags.map((t) => (
              <Badge key={t} variant="outline">{t}</Badge>
            ))}
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <div className="relative w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-ink-tertiary" />
          <Input
            placeholder="Buscar clientes..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        <span className="ml-auto text-xs text-ink-tertiary">{table.getFilteredRowModel().rows.length} clientes</span>
      </div>

      <div className="overflow-hidden rounded-xl border border-base-border">
        <table className="w-full text-left">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-base-border bg-base-card">
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2.5 text-xs font-medium text-ink-tertiary">
                    {header.isPlaceholder ? null : (
                      <button
                        className={cn(
                          "flex items-center gap-1",
                          header.column.getCanSort() && "cursor-pointer select-none hover:text-ink-secondary",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && <ArrowUpDown className="size-3" />}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => navigate(`/clients/${row.original.id}`)}
                className="cursor-pointer border-b border-base-border bg-base-bg transition-colors last:border-0 hover:bg-base-card"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2.5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-ink-tertiary">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </p>
        <div className="flex gap-1.5">
          <Button variant="secondary" size="icon" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="secondary" size="icon" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
