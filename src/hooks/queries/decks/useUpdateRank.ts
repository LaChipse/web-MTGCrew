import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { Api } from '../../../utils/Api';
import { useGetDecks } from './useGetDecks';
import { useGetUsersDecks } from '../joueurs/useGetUsersDecks';
import { useGetAllDecks } from './useGetAllDecks';

const updateRank = async (rank: number) => (
    new Api<{modifiedDeck: number}>()
        .put('/deck/updateRank' , {rank})
)

export const useUpdateRank = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();

    return (
        useMutation({
            mutationFn: (rank: number) => (
                updateRank(rank)
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