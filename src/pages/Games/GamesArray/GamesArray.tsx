import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';
import { IconButton, Pagination } from '@mui/material';
import { useState } from 'react';
import { GameResume } from '../../../hooks/queries/games/useGetGames';
import { PlayersBlock } from '../DrawerGame/DrawerGame';
import { DateHelper } from '../../../utils/DateHelper';
import CustomTooltip from '../../../Layouts/Theme/components/CustomTooltip/CustomTooltip';
import GameDeleteModal from '../GameDeleteModal/GameDeleteModal';
import styles from './GamesArray.module.scss';

type Props = {
    games?: Array<GameResume>
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    divider: number
    count?: number
}

const GamesArray: React.FC<Props> = ({ games, page, setPage, count, divider }) => {
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
        if (type === 'team') return <><strong>Equipe :&nbsp;</strong>{victoire}</>
        if (type === 'each') return <><strong>Joueur :&nbsp;</strong>{config.find((conf) => conf.userId === victoire)?.joueur}</>
        if (type === 'treachery' || type === 'archenemy') return <><strong>Role :&nbsp;</strong>{victoire}</>
        else return '-'
    }

    const typeGame = (type: string, conf: PlayersBlock) => {
        if (type === 'team') return (<><strong>, Equipe: </strong>{conf.team}</>)
        if (type === 'treachery' || type === 'archenemy') return (<><strong>, Role :&nbsp;</strong>{conf.role}</>)
        else return ''
    }

    const formatConfig = (victoire: string, type: string, config: Array<PlayersBlock>) =>(
        <>
            <ul style={{ margin: 0, listStyle: 'none', padding: 0 }}>
                {config.map((conf, index) => {
                    return (
                        <li key={`${conf.deckId}-${conf.userId}-${index}`} style={{ margin: 10, color: showWinnerStyle(victoire, conf) }}>
                            <strong>Joueur :&nbsp;</strong>{conf.joueur}<strong>, Deck :&nbsp;</strong>{conf.deck}{typeGame(type, conf)}
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

        if (isWinner) return 'var(--success)'
        return 'var(--white)'
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
            <div className={styles.gamesArray}>
                <table>
                    <thead>
                        <tr>
                            <th align="center" style={{ minWidth: "75px" }}>Date</th>
                            <th align="center" style={{ minWidth: "75px" }}>Type de partie</th>
                            <th align="center" style={{ minWidth: "75px" }}>Ranked ?</th>
                            <th align="center" style={{ minWidth: "75px" }}>Victoire</th>
                            <th align="center" style={{ minWidth: "50px" }}>Type de victoire</th>
                            <th align='center' style={{ minWidth: '75px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {games?.map((game) => (
                            <tr key={game.id}>
                                <td align="center">{ game?.date ? DateHelper.formatAsFrenchDate(game?.date) : '-' }</td>
                                <td align="center">{ formatType(game.type) }</td>
                                <td align="center">{ game.isRanked ? 'Oui' : 'Non' }</td>
                                <td align="center">
                                    <div className={styles.gameInfos}>
                                        { formatVictoire(game.type, game.victoire, game.config) }
                                        <CustomTooltip title={formatConfig(game.victoire, game.type, game.config)} placement="top">
                                            <HelpIcon style={{ marginLeft: 5 }} fontSize="small"/>
                                        </CustomTooltip>
                                    </div>
                                </td>
                                <td align="center">{ game.typeVictoire }</td>
                                <td align='center'>
                                    <IconButton style={{padding: 1}} className={styles.delete} onClick={() => handleDeleteOpen(game.id)} value={game.id}>
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination page={page} count={getPaginate()} onChange={handlePageChange} shape="rounded" size="small" className={styles.pagination}/>

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