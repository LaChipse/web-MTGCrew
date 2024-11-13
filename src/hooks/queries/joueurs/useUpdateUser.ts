import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { useGetAllPlayers } from './useGetAllPlayers';
import { useAppSelector } from '../../useAppSelector';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/reducers/authReducer';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';

const updateUser = (nom: string, prenom: string, password?: string, ) => (
    new Api<{ nom: string, prenom: string }>()
        .setBearerToken()
        .put('/user/update', {nom, prenom, password})
)

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useDispatch()

    return (
        useMutation({
            mutationFn: (data: {nom: string, prenom: string, password?: string}) => (
                updateUser(data.nom, data.prenom, data.password)
            ),
            onSuccess: (data) => {
                useGetAllPlayers.reset(queryClient)
                if (user) {
                    dispatch(authActions.updateState({
                        ...user,
                        nom: data.nom,
                        prenom: data.prenom,
                    }));
                }
                dispatch(addSuccessSnackbar('Profil mis à jour'));
            }
        })
    )
}