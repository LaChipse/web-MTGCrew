import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { filtersGames } from '../../../store/reducers/gameFiltersReducer';
import { Api } from '../../../utils/Api';
import { resetQuerie } from '../../../utils/resetQuerie';
import { GameResume } from './useGetGames';

const getHistoryGames = async (isStandard: boolean, page: number, filters: filtersGames) => {
    const searchParams = new URLSearchParams();

    if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            // Si c’est un objet dayjs, on le formate
            if (dayjs.isDayjs(value)) {
                searchParams.append(key, value.toISOString()); // ou value.format('YYYY-MM-DD') selon le besoin
            } else {
                searchParams.append(key, String(value));
            }
        });
    }

    const queryString = searchParams.toString();
    const url = `/game/history/${isStandard}/${page}${queryString ? `?${queryString}` : ''}`;

    return await new Api<Array<GameResume>>().setBearerToken().get(url);
};

export const useGetHistoryGames = (
    isStandard: boolean,
    page: number,
    filters: filtersGames,
) => {
    return useQuery({
        queryKey: ['getHistoryGames', isStandard, page, filters],
        queryFn: () => getHistoryGames(isStandard, page, filters),
    });
};

useGetHistoryGames.reset = resetQuerie(['getHistoryGames']);