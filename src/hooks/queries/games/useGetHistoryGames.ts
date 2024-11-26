import { useQuery } from '@tanstack/react-query';
import { GameResume } from './useGetGames';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';

const getHistoryGames = async (isStandard: boolean) => (
    await new Api<Array<GameResume>>()
        .setBearerToken()
        .get(`/game/history/${isStandard}`)
)

export const useGetHistoryGames = (isStandard: boolean) => (
    useQuery({
        queryKey: ['getHistoryGames', isStandard],
        queryFn: () => getHistoryGames(isStandard),
    })
);

useGetHistoryGames.reset = resetQueries(['getHistoryGames']);