export const queryKeys = {
	todos: ["todos"] as string[],
	todo: (id: string) => ["todos", id] as const,
};
