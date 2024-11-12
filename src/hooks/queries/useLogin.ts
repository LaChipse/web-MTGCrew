import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATH } from '../../router/routes.js';
import { Api } from '../../utils/Api';
// import { useAppLocation } from '../useAppLocation';

const login = (nom: string, prenom:string, password: string) => (
    new Api<{ token: string }>()
        .post('/auth/login', {nom, prenom, password})
)

export const useLogin = (): UseMutationResult<{ token: string }, Error, { nom: string; prenom: string, password: string }> => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: { nom: string; prenom: string,  password: string }) => login(data.nom, data.prenom, data.password),
        onSuccess: (data) => {
            localStorage.setItem('token', btoa(data.token));
            navigate(AUTH_PATH.replace(':token', btoa(data.token)));
        }
    });
};