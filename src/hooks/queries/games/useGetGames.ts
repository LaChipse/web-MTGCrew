import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';
import { PlayersBlock } from '../../../pages/Games/DrawerGamesForm/Standard/DrawerStandardGamesForm';

export interface GameResume {
    id: string,
    date?: Date,
    type: string,
    config: Array<PlayersBlock>,
    victoire: string, 
    typeVictoire: string
}

const getGames = async (isStandard: boolean, page: number) => (
    await new Api<Array<GameResume>>()
        .get(`/game/all/${isStandard}/${page}`)
)

export const useGetGames = (isStandard: boolean, page: number) => (
    useQuery({
        queryKey: ['getGames', isStandard, page],
        queryFn: () => getGames(isStandard, page),
    })
);

useGetGames.reset = resetQueries(['getGames']);