import { useQuery } from '@tanstack/react-query';
import { Api } from '../../utils/Api';
import { AuthUser } from '../../store/reducers/authReducer';

const getAuthUser = async (token: string) => (
    await new Api<AuthUser>()
        .setBearerToken(token)
        .get('/user')
)

export const useGetAuthUser = (token: string) => (
    useQuery({
        queryKey: ['getAuthUser', token],
        queryFn: () => getAuthUser(token),
        enabled: !!token
    })
);