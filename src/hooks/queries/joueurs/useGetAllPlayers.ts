import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';
import { PartiesTypes } from '../../../store/reducers/authReducer';
import { useAppSelector } from '../../useAppSelector';

export interface User {
    id: string
    fullName: string
    nbrDecks: number,
    partiesJouees: PartiesTypes,
    victoires: PartiesTypes,
    hundredGameWins: number
}

const getAllPlayers = async (isStandard: boolean, sort?: { key: string, direction: -1 | 1 }) => {
    let params = undefined

    if (sort) {
        params = new URLSearchParams({
            sortKey: sort.key,
            sortDirection: sort.direction.toString(),
        });
    }

    return (
        await new Api<Array<User>>()
            .get(`/user/all/${isStandard}?${params ? params?.toString() : ''}`)
    )
}

export const useGetAllPlayers = (sort?: { key: string, direction: -1 | 1 }) => {
    const isStandard = useAppSelector((state) => state.type.isStandard);

    return (
        useQuery({
            queryKey: ['getAllPlayers', isStandard, sort],
            queryFn: () => getAllPlayers(isStandard, sort),
        })
    )
};

useGetAllPlayers.reset = resetQueries(['getAllPlayers']);