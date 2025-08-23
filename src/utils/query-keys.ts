export const queryKeys = {
    todos: ['todos'] as const,
    todo: (id: string) => ['todos', id] as const,
}