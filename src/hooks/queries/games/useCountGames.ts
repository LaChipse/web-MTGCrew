import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';

const getCountGames = async (isStandard: boolean) => (
    await new Api<number>()
        .setBearerToken()
        .get(`/game/count/${isStandard}`)
)

export const useCountGames = (isStandard: boolean) => (
    useQuery({
        queryKey: ['getCountGames', isStandard],
        queryFn: () => getCountGames(isStandard),
    })
);

useCountGames.reset = resetQueries(['getCountGames']);