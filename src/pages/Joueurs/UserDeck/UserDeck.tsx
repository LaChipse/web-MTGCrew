import { Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useGetUserDeck } from '../../../hooks/queries/decks/useGetUserDeck';
import classNames from 'classnames';
import styles from './UserDeck.module.scss'

type Props = {
    userId: string
    open: boolean
    setOpen: (value: React.SetStateAction<boolean>) => void
}

const UserDeckModal: React.FC<Props> = ({ userId, open, setOpen }) => {
    const { data: decks } = useGetUserDeck(userId);

    const handleClose = () => {
        setOpen(false);
    };

    const getImg = (couleur: string) => {
        return (
            <div key={couleur} className={styles.img}>
                <img src={`/assets/${couleur.toLocaleLowerCase()}.svg`} alt={couleur} width="20px" height="20px" />
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
                                <TableCell align="center" style={{ minWidth: "100px" }}>Nom</TableCell>
                                <TableCell align="center" style={{ minWidth: "150px" }}>Couleurs</TableCell>
                                <TableCell align="center" style={{ minWidth: "50px" }}>Rank</TableCell>
                                <TableCell align="center" style={{ minWidth: "100px" }}>Nbr parties</TableCell>
                                <TableCell align="center" style={{ minWidth: "75px" }}>Victoires</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {decks?.map((deck) => (
                                <TableRow key={deck.nom}>
                                    <TableCell align="center" style={{fontWeight: 700}} component="th" scope="row">{deck.nom || '-'}</TableCell>
                                    <TableCell style={{lineHeight: 0.5}} align="center">{formatArray(deck.couleurs) || '-'}</TableCell>
                                    <TableCell align="center" className={classNames([styles[deck.rank?.toLocaleUpperCase()], styles.rank])}>
                                        {deck.rank?.toLocaleUpperCase() || '-'}
                                    </TableCell>
                                    <TableCell align="center"> { deck.parties } </TableCell>
                                    <TableCell align="center"> { deck.victoires } </TableCell>
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