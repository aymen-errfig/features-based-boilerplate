// src/providers/ReactQueryProvider.tsx
"use client";

import { MutationCache } from "@tanstack/query-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { toast } from "react-toastify";

declare module "@tanstack/react-query" {
	interface Register {
		mutationMeta: {
			queryKeys?: Array<string>;
			successMessage?: string;
			errorMessage?: string;
		};
	}
}

const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onSuccess: (_data, _variables, _context, mutation) => {
			if (mutation.meta?.successMessage) {
				toast.success(mutation.meta.successMessage);
			}
		},
		onError: (_error, _variables, _context, mutation) => {
			if (mutation.meta?.errorMessage) {
				toast.error(mutation.meta.errorMessage);
			}
		},
		onSettled: (_data, _error, _variables, _context, mutation) => {
			if (mutation.meta?.queryKeys) {
				queryClient.invalidateQueries({
					queryKey: mutation.meta.queryKeys,
				});
			}
		},
	}),
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000, // Example stale time
			retry: false,
		},
	},
});

function makeQueryClient() {
	return queryClient;
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
	if (typeof window === "undefined") {
		// Server: always create a new QueryClient
		return makeQueryClient();
	} else {
		// Browser: use a singleton QueryClient
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

export default function ReactQueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryClient = getQueryClient();
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
