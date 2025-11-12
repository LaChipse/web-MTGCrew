import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { useDispatch } from 'react-redux';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { useGetAllPlayers } from '../joueurs/useGetAllPlayers';
import { useGetUsersDecks } from '../joueurs/useGetUsersDecks';
import { useGetDecks } from '../decks/useGetDecks';
import { GameResume, useGetGames } from './useGetGames';
import { useGetHistoryGames } from './useGetHistoryGames';
import { useCountGames } from './useCountGames';
import { useCountHistoryGames } from './useCountHistoryGames';
import { useAppSelector } from '../../useAppSelector';
import { authActions } from '../../../store/reducers/authReducer';
import { useGetAllDecks } from '../decks/useGetAllDecks';

const deleteGame = (id: string, ) => (
    new Api<GameResume & {isStandard: boolean}>()
        .delete('/game/delete', {id})
)

export const useDeleteGame = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.auth.user);

    return useMutation({
        mutationFn: (id: string) => (
            deleteGame(id)
        ),
        onSuccess: (game) => {
            dispatch(addSuccessSnackbar('Partie supprimé !'))
            
            if (user) {
                const isAuthUserPlayed = game.config.find((conf) => conf.userId === user.id)
                const isAuthUserWinner = game.victoire === user.id
                const partieType = game.isStandard ? 'standard' : 'special'

                if (isAuthUserPlayed) {
                    dispatch(authActions.updateState({
                        ...user,
                        partiesJouees: {
                            ...user.partiesJouees,
                            [partieType]: user.partiesJouees?.[partieType] - 1,
                        },
                        victoires: {
                            ...user.victoires,
                            [partieType]: isAuthUserWinner ? user.victoires?.[partieType] - 1 : user.victoires?.[partieType]
                        }
                    }));
                }
            }

            useGetDecks.reset(queryClient)
            useGetAllDecks.reset(queryClient)
            useGetUsersDecks.reset(queryClient)
            useGetAllPlayers.reset(queryClient)
            useGetGames.reset(queryClient)
            useGetHistoryGames.reset(queryClient)
            useCountGames.reset(queryClient)
            useCountHistoryGames.reset(queryClient)
        },
    })
};