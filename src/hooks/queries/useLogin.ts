import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions, AuthUser } from '../../store/reducers/authReducer.js';
import { Api } from '../../utils/Api';
import { DEFAULT_PAGE_PATH } from '../../router/routes.js';

const login = (nom: string, prenom:string, password: string) => (
    new Api<{ token: string, user: AuthUser }>()
        .post('/auth/login', { nom, prenom, password })
)

export const useLogin = (): UseMutationResult<{ token: string }, Error, { nom: string; prenom: string, password: string }> => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    return useMutation({
        mutationFn: (data: { nom: string; prenom: string,  password: string }) => login(data.nom, data.prenom, data.password),
        onSuccess: (data) => {
            if (data.user) {
                dispatch(authActions.updateState(data.user));
            }

            if (data.token) localStorage.setItem('token', data.token)
            navigate(DEFAULT_PAGE_PATH);
        }
    });
};