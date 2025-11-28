"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "@/api/client";
import type { Todo, TodoForm } from "@/features/todo/types/todo";
import { globalFetcher } from "@/utils/global-fetcher";
import { useOptimisticMutation } from "@/utils/optimistic-mutation";
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

	const queryClient = useQueryClient();
	const { mutate: addTodo, isPending: adding_todo } = useOptimisticMutation({
		meta: {
			successMessage: "added new todo",
			errorMessage: "failed to add new todo",
			queryKeys: queryKeys.todos,
		},
		optimistics: {
			mode: "add",
			mutationFn: async (data) => {
				await apiInstance.post("/todo_list", data);
			},
		},
	});

	const { mutate: deleteTodo, isPending: deleting_todo } = useMutation({
		mutationFn: (id: number) => apiInstance.delete(`/todo_list/${id}`),
		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.todos });

			const prevTodos: Todo[] = queryClient.getQueryData(queryKeys.todos) || [];

			queryClient.setQueryData(queryKeys.todos, [
				...prevTodos.filter((todos) => todos.id !== id, [id]),
			]);

			return { prevTodos };
		},
		meta: {
			successMessage: "deleted todo successfully",
			errorMessage: "failed to delete todo",
			queryKeys: queryKeys.todos,
		},
	});

	const { mutate: toggleCheck } = useMutation({
		mutationFn: ({ id, state }: { id: number; state: boolean }) =>
			apiInstance.patch(`/todo_list/${id}`, { done: state }),
		meta: {
			queryKeys: queryKeys.todos,
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
