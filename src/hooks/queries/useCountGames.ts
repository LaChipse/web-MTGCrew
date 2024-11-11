import { useQuery } from '@tanstack/react-query';
import { Api } from '../../utils/Api';
import { resetQueries } from '../../utils/resetQueries';

const getCountGames = async () => (
    await new Api<number>()
        .setBearerToken()
        .get('/game/count')
)

export const useCountGames = () => (
    useQuery({
        queryKey: ['getCountGames'],
        queryFn: () => getCountGames(),
    })
);

useCountGames.reset = resetQueries(['getCountGames']);