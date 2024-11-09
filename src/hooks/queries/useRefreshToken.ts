import { useMutation } from '@tanstack/react-query';
import { Api } from '../../utils/Api';

const refreshToken = () => (
    new Api<{ newToken: string }>()
        .setBearerToken()
        .post('/api/auth/getToken')
        .then((data) => data.newToken)
    );

export const useRefreshToken = () => {
    return useMutation({
        mutationFn: refreshToken,
    });
};