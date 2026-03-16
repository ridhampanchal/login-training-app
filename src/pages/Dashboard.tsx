import React, { useState } from 'react';
import type { ColumnDef, SortingState } from "@tanstack/react-table"
import { DataTable } from '../components/common/DataTable';
import type { TUser } from '../types/user';
import { useUsers, useDeleteUser } from '../services/user.service';
import { Button } from '../components/ui/button';
import { FaTrash } from 'react-icons/fa';


const Dashboard = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")
    const [sorting, setSorting] = useState<SortingState>([])

    const { data, isLoading } = useUsers(pagination.pageIndex, pagination.pageSize, search, sorting)

    const users = data?.users ?? []
    const count = data?.total ?? 0
    const deleteMutation = useDeleteUser()

    const columns: ColumnDef<TUser>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            id: 'name',
            header: ({ column }) => (
                <div
                    className="cursor-pointer select-none"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                </div>
            ),
            accessorFn: (row) => {
                return row.firstName + ' ' + row.lastName
            }
        },
        {
            accessorKey: "age",
            header: "Age",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <Button
                    onClick={() =>
                        deleteMutation.mutate(row.original.id)
                    }
                    variant={'destructive'}
                >
                    <FaTrash />
                </Button>
            ),
        }
    ];

    return (
        <div className='font-lg'>
            <DataTable columns={columns} data={users} totalCount={count} pagination={pagination} setPagination={setPagination} isLoading={isLoading} searchInput={searchInput}
                setSearchInput={setSearchInput}
                onSearchSubmit={() => {
                    setPagination(p => ({ ...p, pageIndex: 0 }))
                    setSearch(searchInput)
                }}
                sorting={sorting}
                setSorting={setSorting}
            />
        </div>
    );
}

export default Dashboard;
