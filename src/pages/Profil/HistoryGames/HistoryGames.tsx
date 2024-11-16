import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { PlayersBlock } from "../../Games/DrawerGamesForm/DrawerGamesForm"
import { useGetHistoryGames } from "../../../hooks/queries/games/useGetHistoryGames"
import styles from './HistoryGames.module.scss'
import { DateHelper } from "../../../utils/DateHelper"

const HistoryGames = () => {
    const { data: gameHistory, isLoading } = useGetHistoryGames()
    const user = useAppSelector((state) => state.auth.user);

    const formatType = (type: string) => {
        if (type === 'team') return 'En équipe'
        if (type === 'each') return 'Chacun pour soit'
        if (type === 'treachery') return 'Treachery'
    }

    const formatVictoir = (type: string, victoire: string, config: Array<PlayersBlock>) => {
        if (type === 'team') return <><strong>Equipe: </strong>{victoire}</>
        if (type === 'each') return <><strong>Joueur: </strong>{config.find((conf) => conf.userId === victoire)?.joueur}</>
        if (type === 'treachery') return <><strong>Role: </strong>{victoire}</>
    }

    const typeGame = (type: string, conf: PlayersBlock) => {
        if (type === 'team') return (<><strong>, Equipe: </strong>{conf.team}</>)
        if (type === 'treachery') return (<><strong>, Role: </strong>{conf.role}</>)
        else return ''
    }

    const formatConfig = (type: string, config: Array<PlayersBlock>) => (
        <>
            <ul style={{ margin: 0 }}>
                {config.map((conf) => {
                    return (
                        <li>
                            <strong>Joueur: </strong>{conf.joueur}<strong>, Deck: </strong>{conf.deck}{typeGame(type, conf)}
                        </li>
                    )
                })}
            </ul>
        </>
    )

    const winnerStyle = (victoire: string, config: Array<PlayersBlock>) => {
        const userPlayer = config.find((conf) => conf.userId === user?.id)
        const isWinner = (
            (userPlayer?.userId === victoire) 
            || (victoire === 'Seigneur' ? (userPlayer?.role === victoire || userPlayer?.role === 'Gardien') : userPlayer?.role === victoire) 
            || (userPlayer?.team === victoire) 
        )

        if (isWinner) return 'green'
        return 'red'
    }

    return (
        <>
            {isLoading ? (
                <Skeleton variant="rectangular" width={1000} height={300} />
            ) : (
                <TableContainer className={styles.tableau}>
                    <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Date</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Type de partie</TableCell>
                                <TableCell align="center" style={{ minWidth: "150px" }}>Config</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Victoire</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Type de victoire</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gameHistory?.map((game) => (
                                <TableRow key={game.id} className={styles[winnerStyle(game.victoire, game.config)]}>
                                    <TableCell align="center" component="th" scope="row">{ game?.date ? DateHelper.formatAsFrenchDate(game?.date) : '' }</TableCell>
                                    <TableCell align="center">{ formatType(game.type) }</TableCell>
                                    <TableCell align="left">{ formatConfig(game.type, game.config) }</TableCell>
                                    <TableCell align="left">{ formatVictoir(game.type, game.victoire, game.config) }</TableCell>
                                    <TableCell align="center">{ game.typeVictoire }</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            
        </>
    )
}

export default HistoryGames