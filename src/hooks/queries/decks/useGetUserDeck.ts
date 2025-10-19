import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';
import { Deck } from './useGetDecks';

const getUserDeck = async (id: string) => (
    await new Api<Array<Deck>>()
        .setBearerToken()
        .get(`/deck/${id}`)
)

export const useGetUserDeck = (id: string) => (
    useQuery({
        queryKey: ['getUserDeck', id],
        queryFn: () => getUserDeck(id),
        enabled: !!id
    })
);

useGetUserDeck.reset = (id: string) => resetQueries(['getUserDeck', id]);