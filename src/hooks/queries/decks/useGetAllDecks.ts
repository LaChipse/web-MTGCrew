import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';

export interface DeckResume {
    id: string,
    nom: string,
    userId: string,
    rank: number,
    elo: number,
    games: {
        standard: number,
        spec: number,
    },
    imageUrl: string,
    imageArt: string,
}

const getAllDecks = async (sort?: { key: string, direction: -1 | 1 }, filters?: {rank: number}) => {
    const params = new URLSearchParams();
    
    if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
                params.append(key, String(value));
        });
    }

    if (sort) {
        params.append('sortKey', String(sort.key))
        params.append('sortDirection', String(sort.direction.toString()))
    }
    
    return (
        await new Api<Array<DeckResume>>()
            .get(`/deck/all?${params ? params?.toString() : ''}`)
    )
}

export const useGetAllDecks = (sort?: { key: string, direction: -1 | 1 }, filters?: {rank: number}) => (
    useQuery({
        queryKey: ['getAllDecks', sort, filters],
        queryFn: () => getAllDecks(sort, filters),
    })
);

useGetAllDecks.reset = resetQueries(['getAllDecks']);