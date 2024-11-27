import { useQuery } from '@tanstack/react-query';
import { GameResume } from './useGetGames';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';

const getHistoryGames = async (isStandard: boolean, page: number) => (
    await new Api<Array<GameResume>>()
        .setBearerToken()
        .get(`/game/history/${isStandard}/${page}`)
)

export const useGetHistoryGames = (isStandard: boolean, page: number) => (
    useQuery({
        queryKey: ['getHistoryGames', isStandard, page],
        queryFn: () => getHistoryGames(isStandard, page),
    })
);

useGetHistoryGames.reset = resetQueries(['getHistoryGames']);