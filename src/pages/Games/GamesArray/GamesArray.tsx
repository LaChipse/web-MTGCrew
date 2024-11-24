import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useGetGames } from '../../../hooks/queries/games/useGetGames';
import { DateHelper } from '../../../utils/DateHelper';
import { PlayersBlock } from '../DrawerGamesForm/DrawerGamesForm';
import styles from './GamesArray.module.scss';

const GamesArray = () => {
    const { data: games } = useGetGames()

    const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 'none',
            margin: 0,
            fontSize: '13px',
            backgroundColor: 'rgb(29, 29, 29)',
            borderRadius: 8
        }
    });

    const formatType = (type: string) => {
        if (type === 'team') return 'En équipe'
        if (type === 'each') return 'Chacun pour soit'
        if (type === 'treachery') return 'Treachery'
        else return '-'
    }

    const formatVictoire = (type: string, victoire: string, config: Array<PlayersBlock>) => {
        if (type === 'team') return <><strong>Equipe: </strong>{victoire}</>
        if (type === 'each') return <><strong>Joueur: </strong>{config.find((conf) => conf.userId === victoire)?.joueur}</>
        if (type === 'treachery') return <><strong>Role: </strong>{victoire}</>
        else return '-'
    }

    const typeGame = (type: string, conf: PlayersBlock) => {
        if (type === 'team') return (<><strong>, Equipe: </strong>{conf.team}</>)
        if (type === 'treachery') return (<><strong>, Role: </strong>{conf.role}</>)
        else return ''
    }

    const formatConfig = (victoire: string, type: string, config: Array<PlayersBlock>) =>(
        <>
            <ul style={{ margin: 0, listStyle: 'none', padding: 0 }}>
                {config.map((conf) => {
                    return (
                        <li style={{ margin: 10, color: showWinnerStyle(victoire, conf) }}>
                            <strong>Joueur: </strong>{conf.joueur}<strong>, Deck: </strong>{conf.deck}{typeGame(type, conf)}
                        </li>
                    )
                })}
            </ul>
        </>
    )

    const showWinnerStyle = (victoire: string, config: PlayersBlock) => {
        const isWinner = (
            (config?.userId === victoire) 
            || (victoire === 'Seigneur' ? (config?.role === victoire || config?.role === 'Gardien') : config?.role === victoire) 
            || (config?.team === victoire) 
        )

        if (isWinner) return '#00ff00'
        return '#FF0033'
    }

    return (
        <>
            <TableContainer className={styles.tableau}>
                <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ minWidth: "75px" }}>Date</TableCell>
                            <TableCell align="center" style={{ minWidth: "75px" }}>Type de partie</TableCell>
                            <TableCell align="center" style={{ minWidth: "75px" }}>Victoire</TableCell>
                            <TableCell align="center" style={{ minWidth: "75px" }}>Type de victoire</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games?.map((game) => (
                            <TableRow key={game.id}>
                                <TableCell align="center" component="th" scope="row">{ game?.date ? DateHelper.formatAsFrenchDate(game?.date) : '-' }</TableCell>
                                <TableCell align="center">{ formatType(game.type) }</TableCell>
                                <TableCell align="left">
                                    <div className={styles.infosDecks}>
                                        { formatVictoire(game.type, game.victoire, game.config) }
                                        <CustomTooltip title={formatConfig(game.victoire, game.type, game.config)} placement="top">
                                            <InfoIcon fontSize="small" color="primary"/>
                                        </CustomTooltip>
                                    </div>
                                </TableCell>
                                <TableCell align="center">{ game.typeVictoire }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default GamesArray