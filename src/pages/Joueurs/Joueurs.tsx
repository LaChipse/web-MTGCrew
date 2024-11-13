import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useGetAllPlayers, User } from "../../hooks/queries/joueurs/useGetAllPlayers"
import { useCountGames } from "../../hooks/queries/games/useCountGames"
import { useGetUsersDecks } from "../../hooks/queries/joueurs/useGetUsersDecks"
import styles from './Joueurs.module.scss'

const Joueurs = () => {
    const { data: users, isLoading } = useGetAllPlayers()
    const { data: count } = useCountGames()
    const { data: usersDecks } = useGetUsersDecks()

    const countVictories = users?.reduce((sum, user) => sum + user.victoires, 0)
    
    const highestGamesPlayed = users?.reduce((max, user) => {
        return user.partiesJouees > max.partiesJouees ? user : max;
    });
    
    const highestRatio = users?.reduce((max, user) => {
        return Math.round((user.victoires/(user.partiesJouees  || 1)) * 100) > Math.round((max.victoires/(max.partiesJouees  || 1)) * 100) ? user : max;
    });

    const moreVictory = users?.reduce((max, user) => {
        return user.victoires > max.victoires ? user : max;
    });

    const ratioVictoryDeck = (id: string) => {
        const userDecks = usersDecks?.find((userDeck) => userDeck.id === id)?.decks
        return userDecks?.reduce((max, deck) => {
            return Math.round((deck.victoires/(deck.parties  || 1)) * 100) > Math.round((max.victoires/(max.parties  || 1)) * 100) ? deck : max;
        });
    }

    const mostGamesPlayed = (id: string) => {
        const userDecks = usersDecks?.find((userDeck) => userDeck.id === id)?.decks
        return userDecks?.reduce((max, deck) => {
            return deck.parties > max.parties ? deck : max;
        });
    }

    const ratioVictory = (user: User) => {
        return Math.round((user.victoires/(user.partiesJouees || 1)) * 100)
    }

    const colorVictory = (user: User) => {
        if (ratioVictory(user) >= 50) return 'green'
        else return 'red'
    }

    return (
        <>
            <div>
                <p className={styles.highlights}><img src={`/assets/seringue.png`} alt='seringue' width="35px" height="35px" style={{marginRight: '5px'}}/><strong style={{marginRight: '5px'}}>{highestGamesPlayed?.fullName}</strong>{`(${Math.round(((highestGamesPlayed?.partiesJouees || 0)/(count  || 1)) * 100)}% parties jouées)`}</p>
                <p className={styles.highlights}><img src={`/assets/couronne.png`} alt='couronne' width="40px" height="30px" style={{marginRight: '7px'}}/><strong style={{marginRight: '5px'}}>{highestRatio?.fullName}</strong>{`(${Math.round(((highestGamesPlayed?.victoires || 0)/(highestGamesPlayed?.partiesJouees  || 1)) * 100)}% parties jouées gagnées)`}</p>
                <p className={styles.highlights}><img src={`/assets/muscle.png`} alt='seringue' width="35px" height="35px" style={{marginRight: '5px'}}/><strong style={{marginRight: '5px'}}>{moreVictory?.fullName}</strong>{`(${Math.round(((moreVictory?.victoires || 0)/(countVictories  || 1)) * 100)}% totalité des victoires)`}</p>
            </div>
            {isLoading ? (
                <Skeleton variant="rectangular" width={1000} height={300} />
            ) : (
                <TableContainer className={styles.tableau}>
                    <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ minWidth: "100px" }}>Nom</TableCell>
                                <TableCell align="center" style={{ minWidth: "100px" }}>Nbr decks</TableCell>
                                <TableCell align="center" style={{ minWidth: "100px" }}>Parties jouées</TableCell>
                                <TableCell align="center" style={{ minWidth: "100px" }}>Ratio victoire</TableCell>
                                <TableCell align="center" style={{ minWidth: "150px" }}>Deck le plus joué</TableCell>
                                <TableCell align="center" style={{ minWidth: "150px" }}>Meilleur deck</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.map((user) => (
                                <TableRow key={user.fullName}>
                                    <TableCell align="center" component="th" scope="row">{user.fullName}</TableCell>
                                    <TableCell align="center">{user.nbrDecks}</TableCell>
                                    <TableCell align="center">{`${user.partiesJouees} (${Math.round((user.partiesJouees/(count  || 1)) * 100)}%)`}</TableCell>
                                    <TableCell className={styles[colorVictory(user)]} align="center">{`${user.victoires} (${ratioVictory(user)}%)`}</TableCell>
                                    <TableCell align="left">{ `${mostGamesPlayed(user.id)?.nom} (${Math.round(((mostGamesPlayed(user.id)?.parties || 0)/(user.partiesJouees || 1)) * 100)}%)` }</TableCell>
                                    <TableCell align="left">{ `${ratioVictoryDeck(user.id)?.nom} (${Math.round(((ratioVictoryDeck(user.id)?.victoires || 0)/(ratioVictoryDeck(user.id)?.parties || 1)) * 100)}%)` }</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}

export default Joueurs