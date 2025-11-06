import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';
import { PartiesTypes } from '../../../store/reducers/authReducer';

export interface Deck {
    _id: string,
    nom: string,
    illustrationUrl: string,
    imageArt: string,
    couleurs: Array<string>
    type: string
    rank: number
    parties: PartiesTypes
    victoires: PartiesTypes
    isImprime: boolean
}

const getDecks = async (sort?: { key: string, direction: -1 | 1 }) => {
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
            .get(`/deck/mine?${params ? params?.toString() : ''}`)
    )
}

export const useGetDecks = (sort?: { key: string, direction: -1 | 1 }) => (
    useQuery({
        queryKey: ['getDecks',sort],
        queryFn: () => getDecks(sort),
    })
);

useGetDecks.reset = resetQueries(['getDecks']);