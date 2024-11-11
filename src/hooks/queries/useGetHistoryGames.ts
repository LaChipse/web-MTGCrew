import { useQuery } from '@tanstack/react-query';
import { Api } from '../../utils/Api';
import { resetQueries } from '../../utils/resetQueries';
import { GameResume } from './useGetGames';

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