import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { Deck } from './useGetDecks';


const getOneDeck = async (id: string) => (
    await new Api<Deck>()
        .setBearerToken()
        .get(`/deck/${id}`)
)

export const useGetOneDeck = (id?: string) => (
    useQuery({
        queryKey: ['getOneDeck', id],
        queryFn: () => getOneDeck(id!),
        enabled: !!id
    })
)
