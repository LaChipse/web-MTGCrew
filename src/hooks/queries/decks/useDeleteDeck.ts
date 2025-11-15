import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { useDispatch } from 'react-redux';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { useGetDecks } from './useGetDecks';
import { useGetAllPlayers } from '../joueurs/useGetAllPlayers';
import { useGetUsersDecks } from '../joueurs/useGetUsersDecks';
import { useAppSelector } from '../../useAppSelector';
import { authActions } from '../../../store/reducers/authReducer';
import { useGetUserDeck } from './useGetUserDeck';
import { useGetAllDecks } from './useGetAllDecks';

const deleteDeck = (id: string, ) => (
    new Api<{ token: string }>()
        .setBearerToken()
        .delete('/deck/delete', {id})
)

export const useDeleteDeck = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.auth.user);

    return useMutation({
        mutationFn: (id: string) => (
            deleteDeck(id)
        ),
        onSuccess: () => {
            dispatch(addSuccessSnackbar('Deck supprimé !'))
            
            if (user) {
                dispatch(authActions.updateState({
                    ...user,
                    nbrDecks: user.nbrDecks - 1
                }));

                useGetUserDeck.reset(user.id)
            }

            useGetDecks.reset(queryClient)
            useGetAllPlayers.reset(queryClient)
            useGetUsersDecks.reset(queryClient)
            useGetAllDecks.reset(queryClient)
        }
    })
};