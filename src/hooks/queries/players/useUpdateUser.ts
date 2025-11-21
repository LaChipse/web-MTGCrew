import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { useGetAllPlayers } from './useGetAllPlayers';
import { useAppSelector } from '../../useAppSelector';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/reducers/authReducer';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { THEME } from '../../../utils/Enums/theme';

const updateUser = (nom: string, prenom: string, colorStd: THEME, colorSpec: THEME, password?: string, ) => (
    new Api<{ nom: string, prenom: string, colorStd: THEME, colorSpec: THEME }>()
        .setBearerToken()
        .put('/user/update', {nom, prenom, colorStd, colorSpec, password})
)

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useDispatch()

    return (
        useMutation({
            mutationFn: (data: {nom: string, prenom: string, colorStd: THEME, colorSpec: THEME, password?: string}) => (
                updateUser(data.nom, data.prenom, data.colorStd, data.colorSpec, data.password)
            ),
            onSuccess: (data) => {
                useGetAllPlayers.reset(queryClient)
                if (user) {
                    dispatch(authActions.updateState({
                        ...user,
                        nom: data.nom,
                        prenom: data.prenom,
                        colorStd: data.colorStd,
                        colorSpec: data.colorSpec
                    }));
                }
                dispatch(addSuccessSnackbar('Profil mis à jour'));
            }
        })
    )
}