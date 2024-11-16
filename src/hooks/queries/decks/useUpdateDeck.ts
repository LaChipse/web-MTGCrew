import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { Api } from '../../../utils/Api';
import { useGetDecks } from './useGetDecks';
import { useGetUsersDecks } from '../joueurs/useGetUsersDecks';
import { useAppSelector } from '../../useAppSelector';
import { useGetUserDeck } from './useGetUserDeck';

const updateDeck = async (id:string, nom: string, couleurs: Array<string>, isImprime: boolean, rank: string, type?: string) => (
    await new Api<{ token: string }>()
        .setBearerToken()
        .put('/deck/update', {id, nom, couleurs, isImprime, rank, type})
)

export const useUpdateDeck = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.auth.user);

    return (
        useMutation({
            mutationFn: (data: {id:string, nom: string, couleurs: Array<string>, isImprime: boolean, rank:string, type?: string}) => (
                updateDeck(data.id, data.nom, data.couleurs, data.isImprime, data.rank, data.type)
            ),
            onSuccess: () => {
                dispatch(addSuccessSnackbar('Deck modifié !'))
                if (user) useGetUserDeck.reset(user.id)

                useGetDecks.reset(queryClient)
                useGetUsersDecks.reset(queryClient)
            }
        })
    );
}