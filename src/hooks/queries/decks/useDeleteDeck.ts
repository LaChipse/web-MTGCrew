import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { useDispatch } from 'react-redux';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { useGetDecks } from './useGetDecks';

const deleteDeck = (id: string, ) => (
    new Api<{ token: string }>()
        .setBearerToken()
        .delete('/deck/delete', {id})
)

export const useDeleteDeck = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => (
            deleteDeck(id)
        ),
        onSuccess: () => {
            dispatch(addSuccessSnackbar('Deck supprimé !'))
            useGetDecks.reset(queryClient)
        }
    })
};