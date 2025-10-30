import { Loader2 } from "lucide-react";
import { Status } from "@/components/global/div_status";
import { TodoItem } from "@/features/todo/components/molecules/todo-item";
import { useTodos } from "@/features/todo/hooks/use-todos";

export function TodoList() {
	const { todos, todosLoading, todosError, deleteTodo, toggleCheck } =
		useTodos();

	return (
		<div className={"center-flex-col py-5 gap-3"}>
			<Status
				value={{
					loading: todosLoading,
					empty: !!todos && todos.length === 0,
					error: todosError,
				}}
			>
				<Status.Loading>
					<Loader2 className={"animate-spin"} />
				</Status.Loading>
				<Status.List
					// biome-ignore lint/style/noNonNullAssertion: <n>
					data={todos!}
					renderItem={(t) => (
						<TodoItem
							key={t.id}
							item={t}
							onCheck={(_checked) =>
								toggleCheck({ id: t.id, state: _checked as boolean })
							}
							onDelete={() => deleteTodo(t.id)}
						/>
					)}
				/>
			</Status>
		</div>
	);
}
