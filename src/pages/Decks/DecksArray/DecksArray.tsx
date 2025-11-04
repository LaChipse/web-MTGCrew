import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton } from '@mui/material';
import classNames from 'classnames';
import { Dispatch, MouseEvent, useState } from 'react';
import { Deck } from '../../../hooks/queries/decks/useGetDecks';
import { RANK } from '../../../utils/Enums/rank';
import { toTitleCase } from '../../../utils/ToTitleCase';
import ImagePortal from '../composants/ImagePortal/ImagePortal';
import DecksActionModal from '../DecksActionModal/DecksActionModal';
import DecksDeleteModal from '../DecksDeleteModal/DecksDeleteModal';
import styles from './DecksArray.module.scss';

type Props = {
    decks?: Array<Deck>
    partieType: 'standard' | 'special'
    sortConfig: { key: string; direction: 1 | -1 }
    handleSetSortConfig: Dispatch<React.SetStateAction<{
        key: string;
        direction: 1 | -1;
    }>>
}

const DecksArray: React.FC<Props> = ({ decks, partieType, sortConfig, handleSetSortConfig }) => {
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [deletedDeck, setDeletedDeck] = useState<string>('')
    const [selectedDeck, setSelectedDeck] = useState<Deck>()

    const [openDeck, setOpenDeck] = useState<Deck | null>(null); // deck actuellement ouvert
    const [anchor, setAnchor] = useState<DOMRect | null>(null);

    const SortArrow = ({ column }: { column: string }) => {
        if (sortConfig?.key !== column) return (<span className={styles.arrowDisabled}>{"▲"}</span>);
        return <span className={styles.arrow}>{sortConfig.direction === 1 ? "▲" : "▼"}</span>;
    };

    const requestSort = (key: string) => {
        let direction: -1 | 1 = 1;

        if (sortConfig?.key === key && sortConfig.direction === 1) {
            direction = -1;
        }

        handleSetSortConfig({ key, direction });
    };

    const handleClick = (deck: Deck, event: MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setAnchor(rect);
        handleOpenImage(deck);
    };

    const countGames = decks?.reduce((sum, deck) => sum + deck.parties?.[partieType], 0)

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

    const handleOpen = (deck: Deck) => {
        setSelectedDeck(deck)
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
            <div className={styles.tableau} onClick={handleCloseImg}>
                <table aria-label='deck table'>
                    <thead>
                        <tr>
                            <th align='center' onClick={() => requestSort("nom")}>Nom <SortArrow column="nom" /></th>
                            <th align='center' >Couleurs</th>
                            <th align='center' onClick={() => requestSort("type")}>Type <SortArrow column="type" /></th>
                            <th align='center' onClick={() => requestSort("rank")}>Rank <SortArrow column="rank" /></th>
                            <th align='center' onClick={() => requestSort(`parties.${partieType}`)}>Nbr parties <SortArrow column={`parties.${partieType}`} /></th>
                            <th align='center' onClick={() => requestSort(`victoires.${partieType}`)}>Victoires <SortArrow column={`victoires.${partieType}`} /></th>
                            <th align='center' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {decks?.map((deck) => (
                            <tr key={deck.nom}>
                                <th align='center' style={{fontWeight: 700}} className={styles.styckyCol} scope='row'>
                                    { deck.illustrationUrl ?
                                        <>
                                            <a style={{ cursor: 'pointer', color: 'white', textDecoration: 'underline' }} onClick={(e) => handleClick(deck, e)}>{deck.nom}</a>
                                            {openDeck && openDeck?._id === deck._id && anchor && (
                                                <ImagePortal anchor={anchor} illustrationUrl={openDeck.illustrationUrl}/>
                                            )}
                                        </>
                                        : <>{deck.nom}</>
                                    }
                                </th>
                                <td style={{lineHeight: 0.5}} align='center'>{formatArray(deck.couleurs)}</td>
                                <td align='center'>{toTitleCase(deck.type) || '-'}</td>
                                <td align='center' className={classNames([styles[RANK[deck.rank - 1].toLocaleUpperCase()], styles.rank])}>
                                    {deck.rank  || '-'}
                                </td>
                                <td align='center'>{`${deck.parties?.[partieType]} (${Math.round((deck.parties?.[partieType] / (countGames || 1)) * 100)}%)`}</td>
                                <td align='center'>{`${deck.victoires?.[partieType]}`} {<span className={styles[colorVictory(deck)]} >{`(${ratioVictory(deck)}%)`}</span>}</td>
                                <td align='center' className={styles.actions}>
                                    <IconButton style={{padding: 1}} className={styles.edit} onClick={() => handleOpen(deck)}><ModeEditIcon/></IconButton>
                                    <IconButton style={{padding: 1}} className={styles.delete} onClick={() => handleDeleteOpen(deck._id)} value={deck._id}><DeleteIcon/></IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
                    key={selectedDeck._id}
                    deck={selectedDeck}
                />
            )} 
        </>
    )
}

export default DecksArray