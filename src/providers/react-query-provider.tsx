// src/providers/ReactQueryProvider.tsx
'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // Example stale time
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: always create a new QueryClient
        return makeQueryClient();
    } else {
        // Browser: use a singleton QueryClient
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export default function ReactQueryProvider({children}: { children: React.ReactNode }) {
    const queryClient = getQueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}