import axios from "axios"
import type { TUser } from "../types/user"
import type { SortingState } from "@tanstack/react-table"

export type UsersResponse = {
    users: TUser[],
    total: number
}

export const fetchUsers = async (
    pageIndex: number,
    pageSize: number,
    search?: string,
    sorting?: SortingState
): Promise<UsersResponse> => {
    const sort = sorting?.[0] ?? null

    const url = search
        ? "https://dummyjson.com/users/search"
        : "https://dummyjson.com/users"

    const res = await axios.get(url, {
        params: {
            limit: pageSize,
            skip: pageIndex * pageSize,
            q: search,
            select: "id,firstName,lastName,age,email,phone",
            ...(sort ? {
                sortBy: sort?.id === "name" ? "firstName" : sort?.id,
                order: sort?.desc ? "desc" : "asc"
            } : {}),
        },
    })

    return res.data
}

export const deleteUser = async (id: number) => {
    return await axios.delete(`https://dummyjson.com/users/${id}`)
}