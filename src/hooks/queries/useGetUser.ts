import { useQuery } from '@tanstack/react-query';
import { Api } from '../../utils/Api';
import { AuthUser } from '../../store/reducers/authReducer';


const getUser = async () => (
    await new Api<AuthUser>()
    .setBearerToken()
    .get('/user')
)

export const useGetUser = () => (
    useQuery({
        queryKey: ['getUser'],
        queryFn: () => getUser(),
    })
);