import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQuerie } from '../../../utils/resetQuerie';
import { Deck } from './useGetDecks';

const getUserDeck = async (id: string, sort?: { key: string, direction: -1 | 1 }) => {
    let params = undefined

    if (sort) {
        params = new URLSearchParams({
            sortKey: sort.key,
            sortDirection: sort.direction.toString(),
        });
    }
    
    return (
        await new Api<Array<Deck>>()
            .setBearerToken()
            .get(`/deck/user/${id}?${params ? params?.toString() : ''}`)
    )
}
export const useGetUserDeck = (id: string, sort?: { key: string, direction: -1 | 1 }) => (
    useQuery({
        queryKey: ['getUserDeck', id, sort],
        queryFn: () => getUserDeck(id, sort),
        enabled: !!id
    })
);

useGetUserDeck.reset = (id: string) => resetQuerie(['getUserDeck', id]);