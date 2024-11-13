import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { resetQueries } from '../../../utils/resetQueries';
import { Deck } from '../decks/useGetDecks';

export interface UserDeck {
    id: string
    decks: Array<Deck>
}

const getUsersDecks = async () => (
    await new Api<Array<UserDeck>>()
        .get('/user/usersDecks')
)

export const useGetUsersDecks = () => (
    useQuery({
        queryKey: ['getUsersDecks'],
        queryFn: () => getUsersDecks(),
    })
);

useGetUsersDecks.reset = resetQueries(['getUsersDecks']);