import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { useDeleteDeck } from '../../../hooks/queries/decks/useDeleteDeck';
import { Deck } from '../../../hooks/queries/decks/useGetDecks';
import { toTitleCase } from '../../../utils/ToTitleCase';
import DecksUpdateModal from '../DecksUpdateModal/DecksUpdateModal';
import styles from './DecksArray.module.scss';

type Props = {
    decks?: Array<Deck>
    isLoading: boolean
}

const DecksArray: React.FC<Props> = ({ decks, isLoading }) => {
    const [open, setOpen] = useState(false);
    const [selectedDeck, setSelectedDeck] = useState<Deck>()

    const countGames = decks?.reduce((sum, deck) => sum + deck.parties, 0)

    const { mutate: deleteDeck } = useDeleteDeck();

    const formatBooelan = (boolean: boolean) =>{
        if (boolean) return "Oui"
        return "Non"
    }

    const getImg = (couleur: string) => {
        return (
            <div key={couleur} className={styles.img}>
                <img src={`/assets/${couleur.toLocaleLowerCase()}.svg`} alt={couleur} width="20px" height="20px" />
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

    const handleDelete =(id: string) => {
        deleteDeck(id)
    }

    const ratioVictory = (deck: Deck) => {
        return Math.round((deck.victoires/(deck.parties || 1)) * 100)
    }

    const colorVictory = (deck: Deck) => {
        if (ratioVictory(deck) >= 50) return 'green'
        else return 'red'
    }

    return (
        <>
            {isLoading? (
                <Skeleton variant="rectangular" width={1000} height={300} />
            ) : (
                <TableContainer className={styles.tableau}>
                    <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ minWidth: "100px" }}>Nom</TableCell>
                                <TableCell align="center" style={{ minWidth: "175px" }}>Couleurs</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Type</TableCell>
                                <TableCell align="center" style={{ minWidth: "50px" }}>Rank</TableCell>
                                <TableCell align="center" style={{ minWidth: "100px" }}>Parties jouées</TableCell>
                                <TableCell align="center" style={{ minWidth: "100px" }}>Ratio victoire</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Deck imprimé ?</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {decks?.map((deck) => (
                                <TableRow key={deck.nom}>
                                    <TableCell align="center" style={{fontWeight: 700}} component="th" scope="row">{deck.nom}</TableCell>
                                    <TableCell align="center">{formatArray(deck.couleurs)}</TableCell>
                                    <TableCell align="center">{toTitleCase(deck.type)}</TableCell>
                                    <TableCell align="center" className={classNames([styles[deck.rank.toLocaleUpperCase()], styles.rank])}>
                                        {deck.rank.toLocaleUpperCase()}
                                    </TableCell>
                                    <TableCell align="center">{`${deck.parties} (${Math.round((deck.parties/(countGames  || 1)) * 100)}%)`}</TableCell>
                                    <TableCell className={styles[colorVictory(deck)]} align="center">{`${deck.victoires} (${ratioVictory(deck)}%)`}</TableCell>
                                    <TableCell align="center">{formatBooelan(deck.isImprime)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton style={{padding: 3}} color="primary" size="small" onClick={() => handleOpen(deck)}><ModeEditIcon/></IconButton>
                                        <IconButton style={{padding: 3}} color="error" size="small" onClick={() => handleDelete(deck._id)} value={deck._id}><DeleteIcon/></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {selectedDeck && (
                <DecksUpdateModal 
                    open={open}
                    setOpen={setOpen}
                    deck={selectedDeck}
                />
            )}
        </>
    )
}

export default DecksArray