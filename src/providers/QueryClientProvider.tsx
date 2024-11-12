import { MutationCache, QueryCache,QueryClient,QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { useQueryErrorHandler } from '../hooks/useQueryErrorHandler';

type Props = {
    children: ReactNode
}

// const SIX_MINUTES_IN_MILISECONDS = 6 * 60 * 1000;
// const FIVE_MINUTES_IN_MILISECONDS = 5 * 60 * 1000;

const QueryClientProvider: React.FC<Props> = ({ children }) => {
    const handleError = useQueryErrorHandler();

    const client = new QueryClient({
        defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            gcTime: 0,
            staleTime: 0,
        },
        },
        queryCache: new QueryCache({
            onError: handleError
        }),
        mutationCache: new MutationCache({
            onError: handleError,
        }),
    });

    return (
        <BaseQueryClientProvider client={client}>
        {children}
        </BaseQueryClientProvider>
    );
};

export default QueryClientProvider;
