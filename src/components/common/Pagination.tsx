import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

import type { Table } from "@tanstack/react-table"

type Props<TData> = {
    table: Table<TData>
    totalCount?: number   // optional for server pagination
}

const getPages = (current: number, total: number): (number | "ellipsis")[] => {

    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i)
    }

    // ⭐ start block
    if (current <= 3) {
        return [0, 1, 2, 3, 4, "ellipsis", total - 1]
    }

    // ⭐ end block
    if (current >= total - 4) {
        return [
            0,
            "ellipsis",
            total - 5,
            total - 4,
            total - 3,
            total - 2,
            total - 1,
        ]
    }

    // ⭐ middle block
    return [
        0,
        "ellipsis",
        current - 1,
        current,
        current + 1,
        "ellipsis",
        total - 1,
    ]
}

export function DataTablePagination<TData>({
    table,
    totalCount,
}: Props<TData>) {

    const pageIndex = table.getState().pagination.pageIndex
    const pageSize = table.getState().pagination.pageSize

    const totalPages = totalCount
        ? Math.ceil(totalCount / pageSize)
        : table.getPageCount()

    const pages = getPages(pageIndex, totalPages)

    return (
        <div className="flex items-center justify-between">

            {/* rows per page */}
            <div className="flex items-center gap-2">
                <p className="text-sm">Rows per page</p>

                <Select
                    value={String(pageSize)}
                    onValueChange={(v) => {
                        table.setPageIndex(0)
                        table.setPageSize(Number(v))
                    }}
                >
                    <SelectTrigger className="w-20">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {[5, 10, 20, 50].map((s) => (
                            <SelectItem key={s} value={String(s)}>
                                {s}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* pagination */}
            <Pagination className="flex justify-end">
                <PaginationContent>

                    {/* previous page */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => table.previousPage()}
                            className={
                                !table.getCanPreviousPage()
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                            size={'default'}
                        />
                    </PaginationItem>

                    {pages.map((p, i) =>
                        p === "ellipsis" ? (
                            <PaginationItem key={`e-${i}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    isActive={p === pageIndex}
                                    onClick={() => table.setPageIndex(p)}
                                    className="cursor-pointer"
                                    size={'default'}
                                >
                                    {p + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}

                    {/* next page */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => table.nextPage()}
                            className={
                                !table.getCanNextPage()
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                            size={'default'}
                        />
                    </PaginationItem>

                </PaginationContent >
            </Pagination>

        </div >
    )
}