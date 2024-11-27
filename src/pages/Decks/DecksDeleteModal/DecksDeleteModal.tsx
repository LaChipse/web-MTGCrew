import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDeleteDeck } from '../../../hooks/queries/decks/useDeleteDeck';
import styles from './DecksDeleteModal.module.scss'

type Props = {
    open: boolean
    deletedDeck: string
    setOpen: (value: React.SetStateAction<boolean>) => void
    setDeletedDeck: (value: React.SetStateAction<string>) => void
}

const DecksDeleteModal: React.FC<Props> = ({ open, deletedDeck, setDeletedDeck, setOpen }) => {

    const { mutate: deleteDeck } = useDeleteDeck();

    const handleDelete =() => {
        deleteDeck(deletedDeck)
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
            aria-labelledby="deleteDeck"
            aria-describedby="delete Deck"
        >
            <Box className={styles.modal}>
                <p id="deleteDeck" style={{marginBottom: 30, fontWeight: 700, fontSize: 18}}>Etes-vous sûr de vouloir supprimer ce deck ?</p>

                <div className={styles.buttons}>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button variant='contained' onClick={handleDelete}>Confirmer</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default DecksDeleteModal