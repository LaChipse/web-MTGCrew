import { useQuery } from '@tanstack/react-query';
import { Api } from '../../utils/Api';
import { resetQueries } from '../../utils/resetQueries';

export interface Deck {
    _id: string,
    nom: string,
    couleurs: Array<string>
    type: string
    rank: string
    parties: number
    victoires: number
    isImprime: boolean
}

const getDecks = async () => (
    await new Api<Array<Deck>>()
        .setBearerToken()
        .get('/deck/mine')
)

export const useGetDecks = () => (
    useQuery({
        queryKey: ['getDecks'],
        queryFn: () => getDecks(),
    })
);

useGetDecks.reset = resetQueries(['getDecks']);