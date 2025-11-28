import {
	type MutationMeta,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

type AddMode<T> = {
	mode: "add";
	mutationFn: (data: T) => Promise<void>;
};

type RemoveMode = {
	mode: "remove";
	mutationFn: (id: number) => Promise<void>;
};

type OptimisticMutationOptions<T> = AddMode<T>;

interface MyMeta extends MutationMeta {
	queryKeys: string[];
}

export function useOptimisticMutation<T>({
	meta,
	optimistics,
}: {
	meta: MyMeta;
	optimistics: OptimisticMutationOptions<T>;
}) {
	const queryClient = useQueryClient();

	const { mutationFn, mode } = optimistics;

	return useMutation({
		mutationFn: mutationFn,
		meta,

		onMutate: async (input) => {
			await queryClient.cancelQueries({ queryKey: meta.queryKeys });

			const prev = queryClient.getQueryData<T[]>(meta.queryKeys) || [];

			let next = prev;

			if (mode === "add") {
				next = [...prev, input as T];
			}

			// if (mode === "remove") {
			// 	// biome-ignore lint/suspicious/noExplicitAny: <id>
			// 	next = prev.filter((item: any) => item.id !== input);
			// }

			queryClient.setQueryData(meta.queryKeys, next);

			return { prev };
		},

		// onError: (_err, _data, ctx) => {
		// 	if (ctx?.prev) {
		// 		queryClient.setQueryData(meta.queryKeys, ctx.prev);
		// 	}
		// },
	});
}
