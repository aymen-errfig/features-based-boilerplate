export type Todo = {
	id: number;
	title: string;
	done: boolean;
};

export type TodoForm = Omit<Todo, "id">;
