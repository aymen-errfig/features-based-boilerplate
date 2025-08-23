"use client"

import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

export function createQueryHook<TData, TError = unknown>(
    queryKey: QueryKey,
    fetcher: () => Promise<TData>,
    options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
    return function useCustomQuery() {
        return useQuery<TData, TError>({
            queryKey,
            queryFn: fetcher,
            ...options,
        });
    };
}

