import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { useDeleteDeck } from '../../../hooks/queries/useDeleteDeck';
import { Deck, useGetDecks } from '../../../hooks/queries/useGetDecks';
import { toTitleCase } from '../../../utils/ToTitleCase';
import DecksUpdateModal from '../DecksUpdateModal/DecksUpdateModal';
import styles from './DecksArray.module.scss';

const DecksArray = () => {
    const [open, setOpen] = useState(false);
    const [selectedDeck, setSelectedDeck] = useState(undefined)

    const { data: decks} = useGetDecks()
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

    return (
        <>
            {decks && (
                <TableContainer className={styles.tableau}>
                    <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ minWidth: "100px" }}>Nom</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Couleurs</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Type</TableCell>
                                <TableCell align="center" style={{ minWidth: "50px" }}>Rank</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Parties jouées</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Victoires</TableCell>
                                <TableCell align="center" style={{ minWidth: "80px" }}>Deck imprimé ?</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {decks.map((deck) => (
                                <TableRow key={deck.nom}>
                                    <TableCell align="center" component="th" scope="row">{deck.nom}</TableCell>
                                    <TableCell align="center">{formatArray(deck.couleurs)}</TableCell>
                                    <TableCell align="center">{toTitleCase(deck.type)}</TableCell>
                                    <TableCell align="center" className={classNames([styles[deck.rank.toLocaleUpperCase()], styles.rank])}>
                                        {deck.rank.toLocaleUpperCase()}
                                    </TableCell>
                                    <TableCell align="center">{deck.parties}</TableCell>
                                    <TableCell align="center">{deck.victoires}</TableCell>
                                    <TableCell align="center">{formatBooelan(deck.isImprime)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" size="small" onClick={() => handleOpen(deck)}><ModeEditIcon/></IconButton>
                                        <IconButton color="error" size="small" onClick={() => handleDelete(deck._id)} value={deck._id}><DeleteIcon/></IconButton>
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