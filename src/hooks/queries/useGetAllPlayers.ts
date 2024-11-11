import { useQuery } from '@tanstack/react-query';
import { Api } from '../../utils/Api';
import { resetQueries } from '../../utils/resetQueries';

export interface User {
    id: string
    fullName: string
    nbrDecks: number,
    partiesJouees: number,
    victoires: number,
}

const getAllPlayers = async () => (
    await new Api<Array<User>>()
        .get('/user/all')
)

export const useGetAllPlayers = () => (
    useQuery({
        queryKey: ['getAllPlayers'],
        queryFn: () => getAllPlayers(),
    })
);

useGetAllPlayers.reset = resetQueries(['getAllPlayers']);