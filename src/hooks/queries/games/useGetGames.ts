import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';
import { PlayersBlock } from '../../../pages/Games/DrawerGamesForm/DrawerGamesForm';

export interface GameResume {
    id: string,
    date?: string,
    type: string,
    config: Array<PlayersBlock>,
    victoire: string, 
    typeVictoire: string
}

const getGames = async () => (
    await new Api<Array<GameResume>>()
        .get('/game/all')
)

export const useGetGames = () => (
    useQuery({
        queryKey: ['getGames'],
        queryFn: () => getGames(),
    })
);

useGetGames.reset = resetQueries(['getGames']);