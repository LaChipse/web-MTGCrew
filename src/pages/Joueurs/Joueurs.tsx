import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useGetAllPlayers } from "../../hooks/queries/useGetAllPlayers"
import { useCountGames } from "../../hooks/queries/useCountGames"
import styles from './Joueurs.module.scss'

const Joueurs = () => {
    const { data: users } = useGetAllPlayers()
    const { data: count } = useCountGames()

    const highestGamesPlayed = users?.reduce((max, user) => {
        return user.partiesJouees > max.partiesJouees ? user : max;
    });

    const highestRatio = users?.reduce((max, user) => {
        return Math.round((user.victoires/(user.partiesJouees  || 1)) * 100) > Math.round((max.victoires/(max.partiesJouees  || 1)) * 100)? user : max;
    });

    return (
        <>
        <div>
            <p className={styles.highlights}><img src={`/assets/seringue.png`} alt='seringue' width="30px" height="30px" style={{marginRight: '5px'}}/><strong style={{marginRight: '5px'}}>{highestGamesPlayed?.fullName}</strong>{`(${Math.round(((highestGamesPlayed?.partiesJouees || 1)/(count  || 1)) * 100)}% parties jouées)`}</p>
            <p className={styles.highlights}><img src={`/assets/couronne.png`} alt='couronne' width="40px" height="30px" style={{marginRight: '7px'}}/><strong style={{marginRight: '5px'}}>{highestRatio?.fullName}</strong>{`(${Math.round(((highestGamesPlayed?.victoires || 1)/(highestGamesPlayed?.partiesJouees  || 1)) * 100)}% parties gagnées)`}</p>
        </div>
            {users && (
                <TableContainer className={styles.tableau}>
                    <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ minWidth: "100px" }}>Nom</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Nbr decks</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Parties jouées</TableCell>
                                <TableCell align="center" style={{ minWidth: "50px" }}>Victoires</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Deck le plus joué</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Meilleur deck</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.fullName}>
                                    <TableCell align="center" component="th" scope="row">{user.fullName}</TableCell>
                                    <TableCell align="center">{user.nbrDecks}</TableCell>
                                    <TableCell align="center">{`${user.partiesJouees} (${Math.round((user.partiesJouees/(count  || 1)) * 100)}%)`}</TableCell>
                                    <TableCell align="center">{`${user.victoires} (${Math.round((user.victoires/(user.partiesJouees  || 1)) * 100)}%)`}</TableCell>
                                    <TableCell align="center">Deck</TableCell>
                                    <TableCell align="center">Deck</TableCell>
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