import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Api } from '../../utils/Api';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATH } from '../../router/routes.js'
import { useAppLocation } from '../useAppLocation';

const login = (nom: string, prenom:string, password: string) => (
    new Api<{ token: string }>()
        .post('/auth/login', {nom, prenom, password})
)


export const useLogin = (): UseMutationResult<{ token: string }, Error, { nom: string; prenom: string, password: string }> => {
    const navigate = useNavigate();
    const location = useAppLocation();

    return useMutation({
        mutationFn: (data: { nom: string; prenom: string,  password: string }) => login(data.nom, data.prenom, data.password),
        onSuccess: (data) => {
            // data contient le token, vous pouvez le retourner ou le gérer ici
            localStorage.setItem('token', btoa(data.token));
            navigate(AUTH_PATH.replace(':token', btoa(data.token)), { state: { isInternalRedirect: true, redirect: location.pathname } });
        }
    });
};