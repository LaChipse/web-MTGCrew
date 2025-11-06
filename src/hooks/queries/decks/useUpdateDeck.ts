import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { Api } from '../../../utils/Api';
import { useGetDecks } from './useGetDecks';
import { useGetUsersDecks } from '../joueurs/useGetUsersDecks';
import { useAppSelector } from '../../useAppSelector';
import { useGetUserDeck } from './useGetUserDeck';
import { useGetGames } from '../games/useGetGames';
import { useGetHistoryGames } from '../games/useGetHistoryGames';

const updateDeck = async (id:string, illustrationUrl: string, imageArt: string, nom: string, couleurs: Array<string>, isImprime: boolean, rank: number, type?: string) => (
    await new Api<{ token: string }>()
        .setBearerToken()
        .put('/deck/update', {id, illustrationUrl, imageArt, nom, couleurs, isImprime, rank, type})
)

export const useUpdateDeck = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.auth.user);

    return (
        useMutation({
            mutationFn: (data: {id:string, illustrationUrl: string, imageArt: string, nom: string, couleurs: Array<string>, isImprime: boolean, rank: number, type?: string}) => (
                updateDeck(data.id, data.illustrationUrl, data.imageArt, data.nom, data.couleurs, data.isImprime, data.rank, data.type)
            ),
            onSuccess: () => {
                dispatch(addSuccessSnackbar('Deck modifié !'))
                if (user) useGetUserDeck.reset(user.id)

                useGetDecks.reset(queryClient)
                useGetUsersDecks.reset(queryClient)
                useGetGames.reset(queryClient)
                useGetHistoryGames.reset(queryClient)
            }
        })
    );
}