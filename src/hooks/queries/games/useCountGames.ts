import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { filtersGames } from '../../../store/reducers/gameFiltersReducer';
import { Api } from '../../../utils/Api';
import { resetQuerie } from '../../../utils/resetQuerie';

const getCountGames = async (isStandard: boolean, filters: filtersGames) => {
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
    const url = `/game/count/${isStandard}${queryString ? `?${queryString}` : ''}`;

    return await new Api<number>()
        .setBearerToken()
        .get(url)
}

export const useCountGames = (isStandard: boolean, filters: filtersGames) => {
    return useQuery({
        queryKey: ['getCountGames', isStandard, filters],
        queryFn: () => getCountGames(isStandard, filters),
    })
};

useCountGames.reset = resetQuerie(['getCountGames']);