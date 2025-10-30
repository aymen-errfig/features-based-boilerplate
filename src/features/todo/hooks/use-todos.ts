"use client";

import { useMutation } from "@tanstack/react-query";
import { apiInstance } from "@/api/client";
import type { Todo, TodoForm } from "@/features/todo/types/todo";
import { globalFetcher } from "@/utils/global-fetcher";
import { createQueryHook } from "@/utils/query-creator";
import { queryKeys } from "@/utils/query-keys";

export const useTodos = () => {
	const useTodosFetch = createQueryHook<Todo[]>(queryKeys.todos, () =>
		globalFetcher("/todo_list"),
	);

	const {
		data: todos,
		isLoading: todosLoading,
		isError: todosError,
		isSuccess: todosSuccess,
		isRefetching: todosRefetching,
		refetch: todosRefetch,
	} = useTodosFetch();

	const { mutate: addTodo, isPending: adding_todo } = useMutation({
		mutationFn: (todo: TodoForm) => apiInstance.post("/todo_list", todo),
		meta: {
			successMessage: "added new todo",
			errorMessage: "failed to add new todo",
			invalidatesQueries: queryKeys.todos,
		},
	});

	const { mutate: deleteTodo, isPending: deleting_todo } = useMutation({
		mutationFn: (id: number) => apiInstance.delete(`/todo_list/${id}`),
		meta: {
			successMessage: "deleted todo successfully",
			errorMessage: "failed to delete todo",
			invalidatesQueries: queryKeys.todos,
		},
	});

	const { mutate: toggleCheck } = useMutation({
		mutationFn: ({ id, state }: { id: number; state: boolean }) =>
			apiInstance.patch(`/todo_list/${id}`, { done: state }),
		meta: {
			invalidatesQueries: queryKeys.todos,
		},
	});

	return {
		todos,
		todosLoading,
		todosError,
		todosSuccess,
		todosRefetching,
		todosRefetch,
		adding_todo,
		addTodo,
		deleting_todo,
		deleteTodo,
		toggleCheck,
	};
};
