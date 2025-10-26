import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDeleteGame } from '../../../../hooks/queries/games/useDeleteGame';
import styles from './GameDeleteModal.module.scss'

type Props = {
    open: boolean
    deletedGame: string
    setOpen: (value: React.SetStateAction<boolean>) => void
    setDeletedDeck: (value: React.SetStateAction<string>) => void
}

const GameDeleteModal: React.FC<Props> = ({ open, deletedGame, setDeletedDeck, setOpen }) => {
    const { mutate: deleteGame } = useDeleteGame();

    const handleDelete =() => {
        deleteGame(deletedGame)
        handleClose()
    }

    const handleClose = () => {
        setDeletedDeck('')
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="deleteGame"
            aria-describedby="delete Game"
        >
            <Box className={styles.modal}>
                <p id="deleteGame">Etes-vous sûr de vouloir supprimer cette partie ?</p>

                <div className={styles.buttons}>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button variant='contained' onClick={handleDelete}>Confirmer</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default GameDeleteModal