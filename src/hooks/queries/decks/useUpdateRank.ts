import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { Api } from '../../../utils/Api';
import { useGetDecks } from './useGetDecks';
import { useGetUsersDecks } from '../players/useGetUsersDecks';
import { useGetAllDecks } from './useGetAllDecks';

const updateRank = async () => (
    new Api<{modifiedDeck: number}>()
        .setBearerToken()
        .put('/deck/updateRank')
)

export const useUpdateRank = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();

    return (
        useMutation({
            mutationFn: () => (
                updateRank()
            ),
            onSuccess: () => {
                dispatch(addSuccessSnackbar('Rank mis à jour !'))
                
                useGetDecks.reset(queryClient)
                useGetUsersDecks.reset(queryClient)
                useGetAllDecks.reset(queryClient)
            }
        })
    );
}