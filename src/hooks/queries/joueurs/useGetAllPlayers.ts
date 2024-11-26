import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';
import { PartiesTypes } from '../../../store/reducers/authReducer';

export interface User {
    id: string
    fullName: string
    nbrDecks: number,
    partiesJouees: PartiesTypes,
    victoires: PartiesTypes,
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