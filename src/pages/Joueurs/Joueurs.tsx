import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useCountGames } from "../../hooks/queries/games/useCountGames";
import { useGetAllPlayers, User } from "../../hooks/queries/joueurs/useGetAllPlayers";
import { useGetUsersDecks } from "../../hooks/queries/joueurs/useGetUsersDecks";
import { useAppSelector } from "../../hooks/useAppSelector";
import SmallLoading from "../loader/SmallLoading/SmallLoading";
import UserDeckModal from "./UserDeck/UserDeck";
import styles from './Joueurs.module.scss';
import Seringue from '../../components/Syringe';
import Crown from '../../components/Crown';
import Biceps from '../../components/Biceps';
import Header from '../../Layouts/Theme/components/Header/Header';

const Joueurs = () => {
    const isStandard = useAppSelector((state) => state.type.isStandard);
    
    const { data: users, isLoading: isUsersLaoding } = useGetAllPlayers()
    const { data: usersDecks, isLoading: isUsersDecksLaoding } = useGetUsersDecks()
    const { data: count } = useCountGames(isStandard, {startDate: null, endDate: null})

    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('')
    const partieType = isStandard ? 'standard' : 'special'

    const countVictories = users?.reduce((sum, user) => sum + user.victoires[partieType], 0)

    const highestRatio = () => {
        const highestUsersRatio = users?.reduce((max, user) => {
            const userRatio = Math.round((user.victoires[partieType] / (user.partiesJouees[partieType] || 1)) * 100);
            const maxRatio = Math.round((max.ratio || 0));
            
            if (userRatio > maxRatio) {
                return { ratio: userRatio, users: [user] };
            } else if (userRatio === maxRatio) {
                max.users.push(user);
            }
            return max;
        }, { ratio: 0, users: [] as Array<User> });

        const highUserVictory = highestUsersRatio?.users?.reduce((max, user) => {
            return user.victoires[partieType] > max.victoires[partieType] ? user : max;
        });

        return highUserVictory
    }
    
    const highestGamesPlayed = users?.reduce((max, user) => {
        return user.partiesJouees[partieType] > max.partiesJouees[partieType] ? user : max;
    });

    const moreVictory = users?.reduce((max, user) => {
        return user.victoires[partieType] > max.victoires[partieType] ? user : max;
    });


    const getVictoryRatio = (victoires: number, parties: number) => Math.round((victoires / (parties || 1)) * 100);

    const ratioVictoryDeck = (id: string) => {
        const userDecks = usersDecks?.filter((userDeck) => userDeck.decks.length).find((userDeck) => userDeck.id === id)?.decks;
        return userDecks?.reduce((max, deck) => 
            getVictoryRatio(deck.victoires[partieType], deck.parties[partieType]) > getVictoryRatio(max.victoires[partieType], max.parties[partieType]) ? deck : max
        );
    };

    const overallVictoryRatio = (id: string) => {
        const { victoires, parties } = ratioVictoryDeck(id) || {};
        return getVictoryRatio(victoires?.[partieType] || 0, parties?.[partieType] || 0);
    };

    const mostDeckPlayed = (id: string) => {
        const userDecks = usersDecks?.filter((userDeck) => userDeck.decks.length).find((userDeck) => userDeck.id === id)?.decks
        return userDecks?.reduce((max, deck) => {
            return deck.parties?.[partieType] > max.parties?.[partieType] ? deck : max;
        });
    }

    const ratioVictory = (user: User) => {
        return Math.round((user.victoires?.[partieType] / (user.partiesJouees?.[partieType] || 1)) * 100)
    }

    const colorVictory = (user: User) => {
        if (ratioVictory(user) >= 35) return 'green'
        else return 'red'
    }

    const colorHundredGames = (user: User) => {
        if (user.hundredGameWins >= 35) return 'green'
        else return 'red'
    }

    const handleOpenModal = (id: string) => {
        setSelectedUser(id)
        setOpen(true)
    }

    return (
        <>
            { isUsersLaoding || isUsersDecksLaoding ? (
                <SmallLoading />
            ) : (
                <>
                    <Header />
                    <div>
                        <p className={styles.highlights}><Seringue height='1.5em' width='1.5em' /><strong style={{marginRight: '5px'}}>{highestGamesPlayed?.fullName}</strong>{`(${Math.round(((highestGamesPlayed?.partiesJouees?.[partieType] || 0)/(count || 1)) * 100)}% parties jouées)`}</p>
                        <p className={styles.highlights}><Crown height='1.5em' width='1.5em' /><strong style={{marginRight: '5px'}}>{highestRatio()?.fullName}</strong>{`(${Math.round(((highestRatio()?.victoires?.[partieType] || 0)/(highestRatio()?.partiesJouees?.[partieType] || 1)) * 100)}% parties jouées gagnées)`}</p>
                        <p className={styles.highlights}><Biceps height='1.5em' width='1.5em' /><strong style={{marginRight: '5px'}}>{moreVictory?.fullName}</strong>{`(${Math.round(((moreVictory?.victoires?.[partieType] || 0)/(countVictories || 1)) * 100)}% totalité des victoires)`}</p>
                    </div>

                    <div className={styles.tableau}>
                        <table aria-label="customized table">
                            <thead>
                                <tr>
                                    <th align="center">Nom</th>
                                    <th align="center">Nbr decks</th>
                                    <th align="center">Nbr de parties</th>
                                    <th align="center">Ratio toutes victoires <br/> et 100 dernières</th>
                                    <th align="center">Deck le plus joué</th>
                                    <th align="center">Meilleur deck</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user.fullName}>
                                        <th align="center" style={{ fontWeight: 700 }} className={styles.styckyCol} scope="row">{user.fullName}</th>
                                        <td align="center">
                                            <div className={styles.infosDecks}>
                                                { user.nbrDecks }
                                                <IconButton style={{padding: 0}} onClick={() => handleOpenModal(user.id)}>
                                                    <InfoIcon fontSize="small" color="primary" />
                                                </IconButton> 
                                            </div></td>
                                        <td align="center">{ `${ user.partiesJouees?.[partieType] } (${ Math.round((user.partiesJouees?.[partieType] / (count  || 1)) * 100) }%)` }</td>
                                        <td align="center">
                                            {`${ user.victoires?.[partieType] }`} {<span className={styles[colorVictory(user)]}>{`(${ratioVictory(user) }%)`}</span>} - {<span className={styles[colorHundredGames(user)]}>{`(${ user.hundredGameWins }%)`}</span>}
                                        </td>
                                        <td align="center">{ `${ mostDeckPlayed(user.id)?.nom || 'Non défini' } (${ Math.round(((mostDeckPlayed(user.id)?.parties?.[partieType] || 0)/(count || 1)) * 100) }%)` }</td>
                                        <td align="center">{ `${ ratioVictoryDeck(user.id)?.nom || 'Non défini' } (${ overallVictoryRatio(user.id) }%)` }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <UserDeckModal 
                        userId={selectedUser}
                        open={open}
                        partieType={partieType}
                        setOpen={setOpen}
                    />
                </>
            )}
        </>
    )
}

export default Joueurs