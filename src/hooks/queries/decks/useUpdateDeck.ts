import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { Api } from '../../../utils/Api';
import { useGetDecks } from './useGetDecks';

const updateDeck = async (id:string, nom: string, couleurs: Array<string>, isImprime: boolean, rank: string, type?: string) => (
    await new Api<{ token: string }>()
        .setBearerToken()
        .put('/deck/update', {id, nom, couleurs, isImprime, rank, type})
)

export const useUpdateDeck = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();

    return (
        useMutation({
            mutationFn: (data: {id:string, nom: string, couleurs: Array<string>, isImprime: boolean, rank:string, type?: string}) => (
                updateDeck(data.id, data.nom, data.couleurs, data.isImprime, data.rank, data.type)
            ),
            onSuccess: () => {
                dispatch(addSuccessSnackbar('Deck modifié !'))
                useGetDecks.reset(queryClient)
            }
        })
    );
}