import { useQuery } from '@tanstack/react-query';
import { filtersGetGames, GameResume } from './useGetGames';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';
import dayjs from 'dayjs';

const getHistoryGames = async (isStandard: boolean, page: number, filters: filtersGetGames) => {
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
    const url = `/game/history/${isStandard}/${page}${queryString ? `?${queryString}` : ''}`;

    return await new Api<Array<GameResume>>().setBearerToken().get(url);
};

export const useGetHistoryGames = (
    isStandard: boolean,
    page: number,
    filters: filtersGetGames
) => {
    const { startDate, endDate } = filters;

    const bothDefined = !!startDate && !!endDate;
    const bothUndefined = !startDate && !endDate;

    return useQuery({
        queryKey: ['getHistoryGames', isStandard, page],
        queryFn: () => getHistoryGames(isStandard, page, filters),
        enabled: bothDefined || bothUndefined,
    });
};

useGetHistoryGames.reset = resetQueries(['getHistoryGames']);