import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import { Api } from '../../../utils/Api';
import { Dayjs } from 'dayjs';
import { useAppSelector } from '../../useAppSelector';
import { authActions } from '../../../store/reducers/authReducer';
import { useGetGames } from './useGetGames';
import { useGetAllPlayers } from '../players/useGetAllPlayers';
import { useCountGames } from './useCountGames';
import { useGetDecks } from '../decks/useGetDecks';
import { useGetUsersDecks } from '../players/useGetUsersDecks';
import { useGetHistoryGames } from './useGetHistoryGames';
import { useGetAllDecks } from '../decks/useGetAllDecks';
import { PlayersBlock } from '../../../pages/Games/DrawerGame/DrawerGame';

const addGame = async (date: Dayjs | null, type: string, config: Array<PlayersBlock>, victoire: string, typeVictoire: string, isStandard: boolean, isRanked: boolean) => (
    await new Api<{ config: Array<PlayersBlock>, victoire:string }>()
        .setBearerToken()
        .post('/game/add', {date, type, config, victoire, typeVictoire, isStandard, isRanked})
)

export const useAddGame = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const isStandard = useAppSelector((state) => state.type.isStandard);
    const user = useAppSelector((state) => state.auth.user);

    const partieType = isStandard ? 'standard' : 'special'

    return (
        useMutation({
            mutationFn: (data: {date: Dayjs | null, type: string, config: Array<PlayersBlock>, victoire: string, typeVictoire: string, isStandard: boolean, isRanked: boolean}) => (
                addGame(data.date, data.type, data.config, data.victoire, data.typeVictoire, data.isStandard, data.isRanked)
            ),
            onSuccess: (data) => {
                dispatch(addSuccessSnackbar('Partie ajoutée !'))
                if (user) {
                    const userPlayer = data.config.find((conf) => conf.userId === user?.id)
                    const userWinner = (
                        (userPlayer?.userId === data.victoire) 
                        || (data.victoire === 'Seigneur' ? (userPlayer?.role === data.victoire || userPlayer?.role === 'Gardien') : userPlayer?.role === data.victoire) 
                        || (userPlayer?.team === data.victoire) 
                    )

                    dispatch(authActions.updateState({
                        ...user,
                        partiesJouees: {
                            ...user.partiesJouees,
                            [partieType]: userPlayer? user.partiesJouees?.[partieType] + 1 : user.partiesJouees?.[partieType],
                        },
                        victoires: {
                            ...user.victoires,
                            [partieType]: userWinner ? user.victoires?.[partieType] + 1 : user.victoires?.[partieType]
                        }
                    }));
                }
                
                useGetDecks.reset(queryClient)
                useGetGames.reset(queryClient)
                useCountGames.reset(queryClient)
                useGetAllPlayers.reset(queryClient)
                useGetUsersDecks.reset(queryClient)
                useGetHistoryGames.reset(queryClient)
                useGetAllDecks.reset(queryClient)
            }
        })
    );
}