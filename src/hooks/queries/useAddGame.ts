import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addSuccessSnackbar } from '../../store/reducers/snackbarReducer';
import { Api } from '../../utils/Api';
import { Dayjs } from 'dayjs';
import { PlayersBlock } from '../../pages/Games/DrawerGamesForm/DrawerGamesForm';
import { useGetDecks } from './useGetDecks';
import { useAppSelector } from '../useAppSelector';
import { authActions } from '../../store/reducers/authReducer';
import { useGetGames } from './useGetGames';

const addGame = async (date: Dayjs | null, type: string, config: Array<PlayersBlock>, victoire: string, typeVictoire: string) => (
    await new Api<{ config: Array<PlayersBlock>, victoire:string }>()
        .setBearerToken()
        .post('/game/add', {date, type, config, victoire, typeVictoire})
)

export const useAddGame = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.auth.user);

    return (
        useMutation({
            mutationFn: (data: {date: Dayjs | null, type: string, config: Array<PlayersBlock>, victoire: string, typeVictoire: string}) => (
                addGame(data.date, data.type, data.config, data.victoire, data.typeVictoire)
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
                        partiesJouees: userPlayer? user.partiesJouees + 1 : user.partiesJouees,
                        victoires: userWinner ? user.victoires + 1 : user.victoires
                    }));
                }
                useGetDecks.reset(queryClient)
                useGetGames.reset(queryClient)
            }
        })
    );
}