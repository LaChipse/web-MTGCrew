import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { PlayersBlock } from '../../../pages/Games/DrawerGamesForm/Standard/DrawerStandardGamesForm';
import { filtersGames } from '../../../store/reducers/gameFiltersReducer';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';
export interface GameResume {
    id: string,
    date?: Date,
    type: string,
    config: Array<PlayersBlock>,
    victoire: string, 
    typeVictoire: string
}

const getGames = async (isStandard: boolean, page: number, filters: filtersGames) => {
    const filterParams = new URLSearchParams();

    if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            // Si c’est un objet dayjs, on le formate
            if (dayjs.isDayjs(value)) {
                filterParams.append(key, value.toISOString()); // ou value.format('YYYY-MM-DD') selon le besoin
            } else {
                filterParams.append(key, String(value));
            }
        });
    }

    const queryString = filterParams.toString();
    const url = `/game/all/${isStandard}/${page}${queryString ? `?${queryString}` : ''}`;

    return await new Api<Array<GameResume>>().get(url);
};

export const useGetGames = (
    isStandard: boolean,
    page: number,
    filters: filtersGames,
) => { return useQuery({
        queryKey: ['getGames', isStandard, page, filters],
        queryFn: () => getGames(isStandard, page, filters),
    });
};

useGetGames.reset = resetQueries(['getGames']);