import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from "classnames";
import { useState } from 'react';
import { GameResume } from '../../../../hooks/queries/games/useGetGames';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { PlayersBlock } from '../../../../pages/Games/DrawerGamesForm/Standard/DrawerStandardGamesForm';
import { DateHelper } from '../../../../utils/DateHelper';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import GamesFilter from '../GamesFilter/GamesFilter';
import styles from './GamesArray.module.scss';
import GameDeleteModal from '../GameDeleteModal/GameDeleteModal';

type Props = {
    games?: Array<GameResume>
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    divider: number
    count?: number
    isHystoric?: boolean
}

const GamesArray: React.FC<Props> = ({ games, page, setPage, count, divider, isHystoric }) => {
    const user = useAppSelector((state) => state.auth.user);

    const [isOpen, setIsOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deletedGame, setDeletedGame] = useState<string>('')

    const formatType = (type: string) => {
        if (type === 'team') return 'En équipe'
        if (type === 'each') return 'Chacun pour soi'
        if (type === 'treachery') return 'Treachery'
        if (type === 'archenemy') return 'Archenemy'
        else return '-'
    }

    const formatVictoire = (type: string, victoire: string, config: Array<PlayersBlock>) => {
        if (type === 'team') return <><strong>Equipe: </strong>{victoire}</>
        if (type === 'each') return <><strong>Joueur: </strong>{config.find((conf) => conf.userId === victoire)?.joueur}</>
        if (type === 'treachery' || type === 'archenemy') return <><strong>Role: </strong>{victoire}</>
        else return '-'
    }

    const typeGame = (type: string, conf: PlayersBlock) => {
        if (type === 'team') return (<><strong>, Equipe: </strong>{conf.team}</>)
        if (type === 'treachery' || type === 'archenemy') return (<><strong>, Role: </strong>{conf.role}</>)
        else return ''
    }

    const formatConfig = (victoire: string, type: string, config: Array<PlayersBlock>) =>(
        <>
            <ul style={{ margin: 0, listStyle: 'none', padding: 0 }}>
                {config.map((conf, index) => {
                    return (
                        <li key={`${conf.deckId}-${conf.userId}-${index}`} style={{ margin: 10, color: showWinnerStyle(victoire, conf) }}>
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

    const showWinnerStyle = (victoire: string, config: PlayersBlock) => {
        const isWinner = (
            (config?.userId === victoire) 
            || (victoire === 'Seigneur' ? (config?.role === victoire || config?.role === 'Gardien') : config?.role === victoire) 
            || (config?.team === victoire) 
        )

        if (isWinner) return '#00ff00'
        return '#FF0033'
    }

    const getPaginate = () => {
        if (count) {
            if (count % divider > 0) return (Math.floor(count / divider) + 1)
            return Math.floor(count / divider)
        }
        return 1
    }

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const handleDeleteOpen =(id: string) => {
        setDeleteOpen(true)
        setDeletedGame(id)
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Pagination page={page} count={getPaginate()} onChange={handlePageChange} shape="rounded" size="small" className={styles.pagination}/>
                <FilterListIcon style={{color: 'white'}} onClick={() => setIsOpen(true)}/>
            </div>

            <TableContainer className={styles.tableau}>
                <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ minWidth: "75px" }}>Date</TableCell>
                            <TableCell align="center" style={{ minWidth: "75px" }}>Type de partie</TableCell>
                            <TableCell align="center" style={{ minWidth: "75px" }}>Victoire</TableCell>
                            <TableCell align="center" style={{ minWidth: "50px" }}>Type de victoire</TableCell>
                            <TableCell align='center' style={{ minWidth: '75px' }} className={styles.styckyRow}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games?.map((game) => (
                            <TableRow key={game.id} className={classNames({ [styles[winnerStyle(game.victoire, game.config)]]: isHystoric })}>
                                <TableCell align="center" component="th" scope="row">{ game?.date ? DateHelper.formatAsFrenchDate(game?.date) : '-' }</TableCell>
                                <TableCell align="center">{ formatType(game.type) }</TableCell>
                                <TableCell align="center">
                                    <div className={styles.infosDecks}>
                                        { formatVictoire(game.type, game.victoire, game.config) }
                                        <CustomTooltip title={formatConfig(game.victoire, game.type, game.config)} placement="top">
                                            <VisibilityIcon style={{marginLeft: 5}} fontSize="small" color="primary"/>
                                        </CustomTooltip>
                                    </div>
                                </TableCell>
                                <TableCell align="center">{ game.typeVictoire }</TableCell>
                                <TableCell align='center' className={styles.actions}>
                                    <IconButton style={{padding: 1}} className={styles.delete} size='small' onClick={() => handleDeleteOpen(game.id)} value={game.id}><DeleteIcon/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <GamesFilter
                isOpen={isOpen}
                handleSetIsOpen={setIsOpen}
            />

            {deletedGame && (
                <GameDeleteModal
                    open={deleteOpen}
                    setOpen={setDeleteOpen}
                    deletedGame={deletedGame}
                    setDeletedDeck={setDeletedGame}
                />
            )}
        </>
    )
}

export default GamesArray