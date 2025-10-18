import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';
import { PlayersBlock } from '../../../pages/Games/DrawerGamesForm/Standard/DrawerStandardGamesForm';
import dayjs, { Dayjs } from 'dayjs';

export interface filtersGetGames {
    startDate: Dayjs | null,
    endDate: Dayjs | null,
    victoryRole?: string,
    winnerId?: string
}

export interface GameResume {
    id: string,
    date?: Date,
    type: string,
    config: Array<PlayersBlock>,
    victoire: string, 
    typeVictoire: string
}

const getGames = async (isStandard: boolean, page: number, filters: filtersGetGames) => {
    const searchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        // Si c’est un objet dayjs, on le formate
        if (dayjs.isDayjs(value)) {
            searchParams.append(key, value.toISOString()); // ou value.format('YYYY-MM-DD') selon le besoin
        } else {
            searchParams.append(key, String(value));
        }
    });

    const queryString = searchParams.toString();
    const url = `/game/all/${isStandard}/${page}${queryString ? `?${queryString}` : ''}`;

    return await new Api<Array<GameResume>>().get(url);
};

export const useGetGames = (
    isStandard: boolean,
    page: number,
    filters: filtersGetGames
) => {
    const { startDate, endDate } = filters;

    const bothDefined = !!startDate && !!endDate;
    const bothUndefined = !startDate && !endDate;

    return useQuery({
        queryKey: ['getGames', isStandard, page],
        queryFn: () => getGames(isStandard, page, filters),
        enabled: bothDefined || bothUndefined,
    });
};

useGetGames.reset = resetQueries(['getGames']);