import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteUser, fetchUsers } from "../api/user"
import type { SortingState } from "@tanstack/react-table"

export const useUsers = (
    pageIndex: number,
    pageSize: number,
    search?: string,
    sorting?: SortingState
) => {
    return useQuery({
        queryKey: ["users", pageIndex, pageSize, search, sorting],
        queryFn: () => fetchUsers(pageIndex, pageSize, search, sorting),
        placeholderData: prev => prev
    })
}

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: (id: number) => deleteUser(id)
    })
}