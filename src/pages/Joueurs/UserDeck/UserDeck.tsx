import { Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useGetUserDeck } from '../../../hooks/queries/decks/useGetUserDeck';
import classNames from 'classnames';
import styles from './UserDeck.module.scss'
import { RANK } from '../../../utils/Enums/rank';

type Props = {
    userId: string
    open: boolean
    partieType: 'standard' | 'special',
    setOpen: (value: React.SetStateAction<boolean>) => void
}

const UserDeckModal: React.FC<Props> = ({ userId, open, partieType, setOpen }) => {
    const { data: decks } = useGetUserDeck(userId);

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
                                    <TableCell align="center" style={{fontWeight: 700}} className={styles.styckyCol} component="th" scope="row">{deck.nom || '-'}</TableCell>
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