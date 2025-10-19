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

const getAllPlayers = async (isStandard: boolean) => (
    await new Api<Array<User>>()
        .get(`/user/all/${isStandard}`)
)

export const useGetAllPlayers = () => {
    const isStandard = useAppSelector((state) => state.type.isStandard);

    return (
    useQuery({
        queryKey: ['getAllPlayers', isStandard],
        queryFn: () => getAllPlayers(isStandard),
    })
)};

useGetAllPlayers.reset = resetQueries(['getAllPlayers']);