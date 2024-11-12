import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';

export interface DeckResume {
    id: string,
    nom: string,
    userId: string,
    userFullName: string
}

const getAllDecks = async () => (
    await new Api<Array<DeckResume>>()
        .get('/deck/all')
)

export const useGetAllDecks = () => (
    useQuery({
        queryKey: ['getAllDecks'],
        queryFn: () => getAllDecks(),
    })
);

useGetAllDecks.reset = resetQueries(['getAllDecks']);