import { useQuery } from '@tanstack/react-query';
import { GameResume } from './useGetGames';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';

const getHistoryGames = async () => (
    await new Api<Array<GameResume>>()
        .setBearerToken()
        .get('/game/history')
)

export const useGetHistoryGames = () => (
    useQuery({
        queryKey: ['getHistoryGames'],
        queryFn: () => getHistoryGames(),
    })
);

useGetHistoryGames.reset = resetQueries(['getHistoryGames']);