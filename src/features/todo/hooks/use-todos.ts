"use client"

import {createQueryHook} from "@/utils/query-creator";
import {queryKeys} from "@/utils/query-keys";
import {globalFetcher} from "@/utils/global-fetcher";
import {Todo} from "@/features/todo/types/todo";

export const useTodos = () => {
    const {
        data: todos,
        isLoading: todosLoading,
        isError: todosError,
        isSuccess: todosSuccess,
        isRefetching: todosRefetching,
        refetch: todosRefetch,
        
    } = createQueryHook<Todo[]>(queryKeys.todos, () => globalFetcher('/todo_list'))();

    return {
        todos,
        todosLoading,
        todosError,
        todosSuccess,
        todosRefetching,
        todosRefetch,
    }
}