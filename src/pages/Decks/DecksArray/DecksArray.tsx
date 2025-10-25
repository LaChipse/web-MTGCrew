import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from 'classnames';
import { MouseEvent, useState } from 'react';
import { Deck } from '../../../hooks/queries/decks/useGetDecks';
import { RANK } from '../../../utils/Enums/rank';
import { toTitleCase } from '../../../utils/ToTitleCase';
import ImagePortal from '../composants/ImagePortal/ImagePortal';
import DecksDeleteModal from '../DecksDeleteModal/DecksDeleteModal';
import styles from './DecksArray.module.scss';
import DecksActionModal from '../DecksActionModal/DecksActionModal';

type Props = {
    decks?: Array<Deck>
    partieType: 'standard' | 'special'
}

const DecksArray: React.FC<Props> = ({ decks, partieType }) => {
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [deletedDeck, setDeletedDeck] = useState<string>('')
    const [selectedDeck, setSelectedDeck] = useState<string | undefined>()

    const [openDeck, setOpenDeck] = useState<Deck | null>(null); // deck actuellement ouvert
    const [anchor, setAnchor] = useState<DOMRect | null>(null);

    const handleClick = (deck: Deck, event: MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setAnchor(rect);
        handleOpenImage(deck);
    };

    const countGames = decks?.reduce((sum, deck) => sum + deck.parties?.[partieType], 0)

    const formatBooelan = (boolean: boolean) =>{
        if (boolean) return 'Oui'
        return 'Non'
    }

    const handleOpenImage = (deck: Deck) => {
        setOpenDeck((prev) => (prev === deck ? null : deck));
    }

    const handleCloseImg = () => {
        if (openDeck !== null ) setOpenDeck(null);
    }

    const getImg = (couleur: string) => {
        return (
            <div key={couleur} className={styles.img}>
                <img src={`/assets/${couleur.toLocaleLowerCase()}.svg`} alt={couleur} width='18px' height='18px' />
            </div>
        )
    }

    const handleOpen = (id: string) => {
        setSelectedDeck(id)
        setOpen(true);
    };

    const formatArray = (arr: Array<string>) => {
        return arr.map(getImg);
    }

    const handleDeleteOpen =(id: string) => {
        setDeleteOpen(true)
        setDeletedDeck(id)
    }

    const ratioVictory = (deck: Deck) => {
        return Math.round((deck.victoires?.[partieType] / (deck.parties?.[partieType] || 1)) * 100)
    }

    const colorVictory = (deck: Deck) => {
        if (ratioVictory(deck) >= 50) return 'green'
        else return 'red'
    }

    return (
        <>
            <TableContainer className={styles.tableau} onClick={handleCloseImg}>
                <Table stickyHeader sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead >
                        <TableRow>
                            <TableCell align='center' style={{ minWidth: '100px' }} className={styles.styckyFirstCell}>Nom</TableCell>
                            <TableCell align='center' style={{ minWidth: '150px' }} className={styles.styckyRow}>Couleurs</TableCell>
                            <TableCell align='center' style={{ minWidth: '100px' }} className={styles.styckyRow}>Type</TableCell>
                            <TableCell align='center' style={{ minWidth: '35px' }} className={styles.styckyRow}>Rank</TableCell>
                            <TableCell align='center' style={{ minWidth: '100px' }} className={styles.styckyRow}>Nbr parties</TableCell>
                            <TableCell align='center' style={{ minWidth: '100px' }} className={styles.styckyRow}>Victoires</TableCell>
                            <TableCell align='center' style={{ minWidth: '100px' }} className={styles.styckyRow}>Imprimé ?</TableCell>
                            <TableCell align='center' style={{ minWidth: '75px' }} className={styles.styckyRow}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {decks?.map((deck) => (
                            <TableRow key={deck.nom}>
                                <TableCell align='center' style={{fontWeight: 700}} className={styles.styckyCol} component='th' scope='row'>
                                    { deck.illustrationUrl ?
                                        <>
                                            <a style={{ cursor: 'pointer', color: 'white', textDecoration: 'underline' }} onClick={(e) => handleClick(deck, e)}>{deck.nom}</a>
                                            {openDeck && openDeck?._id === deck._id && anchor && (
                                                <ImagePortal anchor={anchor} illustrationUrl={openDeck.illustrationUrl}/>
                                            )}
                                        </>
                                        : <>{deck.nom}</>
                                    }
                                </TableCell>
                                <TableCell style={{lineHeight: 0.5}} align='center'>{formatArray(deck.couleurs)}</TableCell>
                                <TableCell align='center'>{toTitleCase(deck.type) || '-'}</TableCell>
                                <TableCell align='center' className={classNames([styles[RANK[deck.rank - 1].toLocaleUpperCase()], styles.rank])}>
                                    {deck.rank  || '-'}
                                </TableCell>
                                <TableCell align='center'>{`${deck.parties?.[partieType]} (${Math.round((deck.parties?.[partieType] / (countGames || 1)) * 100)}%)`}</TableCell>
                                <TableCell className={styles[colorVictory(deck)]} align='center'>{`${deck.victoires?.[partieType]} (${ratioVictory(deck)}%)`}</TableCell>
                                <TableCell align='center'>{formatBooelan(deck.isImprime)}</TableCell>
                                <TableCell align='center' className={styles.actions}>
                                    <IconButton style={{padding: 1}} className={styles.edit} size='small' onClick={() => handleOpen(deck._id)}><ModeEditIcon/></IconButton>
                                    <IconButton style={{padding: 1}} className={styles.delete} size='small' onClick={() => handleDeleteOpen(deck._id)} value={deck._id}><DeleteIcon/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {deletedDeck && (
                <DecksDeleteModal
                    open={deleteOpen}
                    setOpen={setDeleteOpen}
                    deletedDeck={deletedDeck}
                    setDeletedDeck={setDeletedDeck}
                />
            )}

            {!!selectedDeck && (
                <DecksActionModal 
                    open={open}
                    setOpen={setOpen}
                    key={selectedDeck}
                    idDeck={selectedDeck}
                />
            )} 
        </>
    )
}

export default DecksArray