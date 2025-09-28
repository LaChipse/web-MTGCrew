import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions, AuthUser } from '../../store/reducers/authReducer.js';
import { Api } from '../../utils/Api';
import { DEFAULT_PAGE_PATH } from '../../router/routes.js';
import { useGetAllPlayers } from './joueurs/useGetAllPlayers.js';
import { useGetUsersDecks } from './joueurs/useGetUsersDecks.js';

const login = (nom: string, prenom:string, password: string) => (
    new Api<{ token: string, user: AuthUser }>()
        .post('/auth/login', { nom, prenom, password })
)

export const useLogin = (): UseMutationResult<{ token: string }, Error, { nom: string; prenom: string, password: string }> => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: (data: { nom: string; prenom: string,  password: string }) => login(data.nom, data.prenom, data.password),
        onSuccess: (data) => {
            useGetAllPlayers.reset(queryClient);
            useGetUsersDecks.reset(queryClient);

            if (data.user) dispatch(authActions.updateState(data.user));

            if (data.token) localStorage.setItem('token', data.token)
            navigate(DEFAULT_PAGE_PATH);
        }
    });
};