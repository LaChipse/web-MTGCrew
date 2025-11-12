import { Api } from '../../../utils/Api';
import { useDispatch } from 'react-redux';
import { useGetDecks } from './useGetDecks';
import { useGetUserDeck } from './useGetUserDeck';
import { useAppSelector } from '../../useAppSelector';
import { useGetAllPlayers } from '../joueurs/useGetAllPlayers';
import { useGetUsersDecks } from '../joueurs/useGetUsersDecks';
import { authActions } from '../../../store/reducers/authReducer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { useGetAllDecks } from './useGetAllDecks';

const addDeck = async (nom: string, illustrationUrl: string, imageArt:string, couleurs: Array<string>, isImprime: boolean, rank: number, type?: string) => (
    await new Api<{ token: string }>()
        .setBearerToken()
        .post('/deck/add', {nom, illustrationUrl, imageArt, couleurs, isImprime, rank, type})
)

export const useAddDeck = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.auth.user);

    return (
        useMutation({
            mutationFn: (data: {nom: string, illustrationUrl: string, imageArt:string, couleurs: Array<string>, isImprime: boolean, rank: number, type?: string}) => (
                addDeck(data.nom, data.illustrationUrl, data.imageArt, data.couleurs, data.isImprime, data.rank, data.type)
            ),
            onSuccess: () => {
                dispatch(addSuccessSnackbar('Deck ajouté !'))
                if (user) {
                    dispatch(authActions.updateState({
                        ...user,
                        nbrDecks: user.nbrDecks + 1
                    }));
                    
                    useGetUserDeck.reset(user.id)
                }
                
                useGetDecks.reset(queryClient)
                useGetAllPlayers.reset(queryClient)
                useGetUsersDecks.reset(queryClient)
                useGetAllDecks.reset(queryClient)
            }
        })
    );
}