import { Box, Modal, Portal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import { useGetUserDeck } from '../../../hooks/queries/decks/useGetUserDeck';
import classNames from 'classnames';
import styles from './UserDeck.module.scss'
import { RANK } from '../../../utils/Enums/rank';
import { Deck } from '../../../hooks/queries/decks/useGetDecks';

type Props = {
    userId: string
    open: boolean
    partieType: 'standard' | 'special',
    setOpen: (value: React.SetStateAction<boolean>) => void
}

const UserDeckModal: React.FC<Props> = ({ userId, open, partieType, setOpen }) => {
    const { data: decks } = useGetUserDeck(userId);

    const [openDeck, setOpenDeck] = useState<Deck | null>(null); // deck actuellement ouvert
    const [anchor, setAnchor] = useState<DOMRect | null>(null);

    const handleClick = (deck: Deck, event: MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setAnchor(rect);
        handleOpenImage(deck);
    };

    const handleOpenImage = (deck: Deck) => {
        setOpenDeck((prev) => (prev === deck ? null : deck));
    }

    const handleClose = () => {
        setOpen(false);
    };

    const getImg = (couleur: string) => {
        return (
            <div key={couleur} className={styles.img}>
                <img src={`/assets/${couleur.toLocaleLowerCase()}.svg`} alt={couleur} width="18px" height="18px" />
            </div>
        )
    }

    const formatArray = (arr: Array<string>) => {
        return arr?.map(getImg);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="updateUser"
            aria-describedby="mise à jour profil"
        >
            <Box className={styles.modal}>
                <TableContainer className={styles.tableau}>
                    <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ minWidth: "100px" }} className={styles.styckyFirstCell}>Nom</TableCell>
                                <TableCell align="center" style={{ minWidth: "150px" }}>Couleurs</TableCell>
                                <TableCell align="center" style={{ minWidth: "35px" }}>Rank</TableCell>
                                <TableCell align="center" style={{ minWidth: "100px" }}>Nbr parties</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Victoires</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {decks?.map((deck) => (
                                <TableRow key={deck.nom}>
                                    <TableCell align='center' style={{ fontWeight: 700 }} className={styles.styckyCol} component='th' scope='row'>
                                        { deck.illustrationUrl ?
                                            <>
                                                <a style={{ fontWeight: 700, cursor: 'pointer', color: 'black', textDecoration: 'underline' }} onClick={(e) => handleClick(deck, e)}>{deck.nom}</a>
                                                {openDeck?._id === deck._id && anchor && (
                                                    <Portal>
                                                        <Box sx={{
                                                            position: 'fixed',
                                                            top: anchor.bottom + 8, // juste sous la cellule
                                                            left: anchor.left + anchor.width / 2,
                                                            transform: 'translateX(-50%)',
                                                            zIndex: 9999,
                                                            padding: '8px',
                                                            borderRadius: '8px',
                                                        }}>
                                                            <img
                                                                src={`${openDeck.illustrationUrl}?w=164&h=164&fit=crop&auto=format`}
                                                                alt={openDeck.illustrationUrl}
                                                                style={{ borderRadius: '10px' }}
                                                                loading='lazy'
                                                            />
                                                        </Box>
                                                    </Portal>
                                                )}
                                            </>
                                            : <>{deck.nom || '-'}</>
                                        }
                                    </TableCell>
                                    <TableCell style={{lineHeight: 0.5}} align="center">{formatArray(deck.couleurs) || '-'}</TableCell>
                                    <TableCell align="center" className={classNames([styles[RANK[deck.rank - 1].toLocaleUpperCase()], styles.rank])}>
                                        {deck.rank || '-'}
                                    </TableCell>
                                    <TableCell align="center"> { deck.parties?.[partieType] } </TableCell>
                                    <TableCell align="center"> { deck.victoires?.[partieType] } </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    )
}

export default UserDeckModal