import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useGetAllPlayers, User } from "../../hooks/queries/joueurs/useGetAllPlayers"
import { useCountGames } from "../../hooks/queries/games/useCountGames"
import { useGetUsersDecks } from "../../hooks/queries/joueurs/useGetUsersDecks"
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";
import UserDeckModal from "./UserDeck/UserDeck";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from './Joueurs.module.scss'

const Joueurs = () => {
    const isStandard = useAppSelector((state) => state.type.isStandard);
    
    const { data: users } = useGetAllPlayers()
    const { data: usersDecks } = useGetUsersDecks()
    const { data: count } = useCountGames(isStandard)

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
        const userDecks = usersDecks?.find((userDeck) => userDeck.id === id)?.decks;
        return userDecks?.reduce((max, deck) => 
            getVictoryRatio(deck.victoires[partieType], deck.parties[partieType]) > getVictoryRatio(max.victoires[partieType], max.parties[partieType]) ? deck : max
        );
    };

    const overallVictoryRatio = (id: string) => {
        const { victoires, parties } = ratioVictoryDeck(id) || {};
        return getVictoryRatio(victoires?.[partieType] || 0, parties?.[partieType] || 0);
    };

    const mostDeckPlayed = (id: string) => {
        const userDecks = usersDecks?.find((userDeck) => userDeck.id === id)?.decks
        return userDecks?.reduce((max, deck) => {
            return deck.parties[partieType] > max.parties[partieType] ? deck : max;
        });
    }

    const ratioVictory = (user: User) => {
        return Math.round((user.victoires[partieType] / (user.partiesJouees[partieType] || 1)) * 100)
    }

    const colorVictory = (user: User) => {
        if (ratioVictory(user) >= 50) return 'green'
        else return 'red'
    }

    const handleOpenModal = (id: string) => {
        setSelectedUser(id)
        setOpen(true)
    }

    return (
        <>
            <div>
                <p className={styles.highlights}><img src={`/assets/seringue.png`} alt='seringue' width="30px" height="30px" style={{marginRight: '5px'}}/><strong style={{marginRight: '5px'}}>{highestGamesPlayed?.fullName}</strong>{`(${Math.round(((highestGamesPlayed?.partiesJouees[partieType] || 0)/(count || 1)) * 100)}% parties jouées)`}</p>
                <p className={styles.highlights}><img src={`/assets/couronne.png`} alt='couronne' width="35px" height="25px" style={{marginRight: '7px'}}/><strong style={{marginRight: '5px'}}>{highestRatio()?.fullName}</strong>{`(${Math.round(((highestRatio()?.victoires[partieType] || 0)/(highestRatio()?.partiesJouees[partieType] || 1)) * 100)}% parties jouées gagnées)`}</p>
                <p className={styles.highlights}><img src={`/assets/muscle.png`} alt='seringue' width="30px" height="30px" style={{marginRight: '10px'}}/><strong style={{marginRight: '5px'}}>{moreVictory?.fullName}</strong>{`(${Math.round(((moreVictory?.victoires[partieType] || 0)/(countVictories || 1)) * 100)}% totalité des victoires)`}</p>
            </div>

            <TableContainer className={styles.tableau}>
                <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ minWidth: "100px" }}>Nom</TableCell>
                            <TableCell align="center" style={{ minWidth: "100px" }}>Nbr decks</TableCell>
                            <TableCell align="center" style={{ minWidth: "125px" }}>Parties jouées</TableCell>
                            <TableCell align="center" style={{ minWidth: "125px" }}>Ratio victoire</TableCell>
                            <TableCell align="center" style={{ minWidth: "150px" }}>Deck le plus joué</TableCell>
                            <TableCell align="center" style={{ minWidth: "175px" }}>Meilleur deck</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user.fullName}>
                                <TableCell align="center" style={{ fontWeight: 700 }} component="th" scope="row">{user.fullName}</TableCell>
                                <TableCell align="center">
                                    <div className={styles.infosDecks}>
                                        { user.nbrDecks }
                                        <IconButton size="small" onClick={() => handleOpenModal(user.id)}>
                                            <InfoIcon fontSize="small" color="primary"/>
                                        </IconButton> 
                                    </div></TableCell>
                                <TableCell align="center">{ `${ user.partiesJouees[partieType] } (${ Math.round((user.partiesJouees[partieType] / (count  || 1)) * 100) }%)` }</TableCell>
                                <TableCell className={styles[colorVictory(user)]} align="center">{`${ user.victoires[partieType] } (${ratioVictory(user) }%)`}</TableCell>
                                <TableCell align="center">{ `${ mostDeckPlayed(user.id)?.nom } (${ Math.round(((mostDeckPlayed(user.id)?.parties[partieType] || 0)/(count || 1)) * 100) }%)` }</TableCell>
                                <TableCell align="center">{ `${ ratioVictoryDeck(user.id)?.nom } (${ overallVictoryRatio(user.id) }%)` }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <UserDeckModal 
                userId={selectedUser}
                open={open}
                partieType={partieType}
                setOpen={setOpen}
            />
        </>
    )
}

export default Joueurs