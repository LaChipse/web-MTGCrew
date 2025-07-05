import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';
import { filtersGetGames } from './useGetGames';
import dayjs from 'dayjs';

const getCountHistoryGames = async (isStandard: boolean, filters: filtersGetGames) => {
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
    const url = `/game/historyCount/${isStandard}${queryString ? `?${queryString}` : ''}`;

    return await new Api<number>()
        .setBearerToken()
        .get(url)
}

export const useCountHistoryGames = (isStandard: boolean, filters: filtersGetGames) => {

    const { startDate, endDate } = filters;

    const bothDefined = !!startDate && !!endDate;
    const bothUndefined = !startDate && !endDate;

    return useQuery({
        queryKey: ['getCountHistoryGames', isStandard],
        queryFn: () => getCountHistoryGames(isStandard, filters),
        enabled: bothDefined || bothUndefined,
    })
};

useCountHistoryGames.reset = resetQueries(['getCountHistoryGames']);