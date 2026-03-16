import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table"

import type { ColumnDef, SortingState } from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"

import { DataTablePagination } from "./Pagination"
import { Skeleton } from "../ui/skeleton"
import { ButtonGroup } from "../ui/button-group"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FaSearch, FaSortUp, FaSortDown } from "react-icons/fa";

type Props<TData> = {
    columns: ColumnDef<TData>[]
    data: TData[]
    totalCount?: number   // optional for server pagination
    pagination: {
        pageIndex: number
        pageSize: number
    }
    setPagination: React.Dispatch<React.SetStateAction<{
        pageIndex: number
        pageSize: number
    }>>,
    isLoading?: boolean
    searchInput: string
    setSearchInput: React.Dispatch<React.SetStateAction<string>>
    onSearchSubmit: () => void
    sorting: SortingState
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>
}

export function DataTable<TData>({ columns, data, totalCount, pagination, setPagination, isLoading, searchInput, setSearchInput, onSearchSubmit, sorting, setSorting }: Props<TData>) {
    const SkeletonRows = ({ columns, rows = 10 }: { columns: ColumnDef<TData>[], rows?: number }) => {
        return Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i}>
                {columns.map((_, j) => (
                    <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                    </TableCell>
                ))}
            </TableRow>
        ))
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        state: {
            pagination,
            sorting
        },
        onPaginationChange: setPagination,
        rowCount: totalCount,
        onSortingChange: setSorting,
        manualSorting: true,
    })

    return (
        <div className="space-y-4">

            {/* TABLE */}
            <div className="border rounded-md">
                <div className="w-full border-b p-2 flex items-center justify-between">
                    <div>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Users
                        </h4>
                        <p className="text-xs">
                            Review all the users
                        </p>
                    </div>
                    <div>
                        <ButtonGroup>
                            <Input placeholder="Search..." value={searchInput} onChange={(e) => {
                                setSearchInput(e.target.value)
                                if (e.target.value === "") {
                                    onSearchSubmit()
                                }
                            }} />
                            <Button variant="outline" aria-label="Search" onClick={onSearchSubmit}>
                                <FaSearch />
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        <div
                                            className="flex items-center gap-1 cursor-pointer select-none"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                            {header.column.getCanSort() && (
                                                header.column.getIsSorted() === "asc" ? (
                                                    <FaSortUp />
                                                ) : header.column.getIsSorted() === "desc" ? (
                                                    <FaSortDown />
                                                ) : null
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <SkeletonRows
                                columns={columns}
                                rows={pagination.pageSize}
                            />
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* PAGINATION */}
            <DataTablePagination table={table} totalCount={totalCount} />

        </div>
    )
}