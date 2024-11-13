import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { useDispatch } from 'react-redux';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { authActions } from '../../../store/reducers/authReducer';
import { useAppSelector } from '../../useAppSelector';
import { useGetAllPlayers } from '../joueurs/useGetAllPlayers';
import { useGetDecks } from './useGetDecks';
import { useGetUsersDecks } from '../joueurs/useGetUsersDecks';

const addDeck = async (nom: string, couleurs: Array<string>, isImprime: boolean, rank: string, type?: string) => (
    await new Api<{ token: string }>()
        .setBearerToken()
        .post('/deck/add', {nom, couleurs, isImprime, rank, type})
)

export const useAddDeck = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.auth.user);

    return (
        useMutation({
            mutationFn: (data: {nom: string, couleurs: Array<string>, isImprime: boolean, rank:string, type?: string}) => (
                addDeck(data.nom, data.couleurs, data.isImprime, data.rank, data.type)
            ),
            onSuccess: () => {
                dispatch(addSuccessSnackbar('Deck ajouté !'))
                if (user) {
                    dispatch(authActions.updateState({
                        ...user,
                        nbrDecks: user.nbrDecks + 1
                    }));
                }
                
                useGetDecks.reset(queryClient)
                useGetAllPlayers.reset(queryClient)
                useGetUsersDecks.reset(queryClient)
            }
        })
    );
}