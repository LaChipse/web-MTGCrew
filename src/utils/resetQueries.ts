import { QueryClient, QueryKey } from '@tanstack/react-query';

/**
 * Renvoie une fonction qui vide la cache de la requête correspondant à la clé.
 * @param queryKey Clé de la requête
 */
export const resetQueries = (queryKey: QueryKey) => (queryClient: QueryClient) => {
    queryClient.resetQueries({ queryKey });
};
