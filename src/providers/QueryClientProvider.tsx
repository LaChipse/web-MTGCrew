import { MutationCache, QueryCache,QueryClient,QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { useQueryErrorHandler } from '../hooks/useQueryErrorHandler';

type Props = {
    children: ReactNode
}

const QueryClientProvider: React.FC<Props> = ({ children }) => {
    const handleError = useQueryErrorHandler();

    const client = new QueryClient({
        defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            gcTime: Infinity,
            staleTime: Infinity,
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
