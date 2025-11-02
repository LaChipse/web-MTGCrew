import { Modal } from '@mui/material';
import React from 'react';
import { useDeleteDeck } from '../../../hooks/queries/decks/useDeleteDeck';
import styles from './DecksDeleteModal.module.scss';

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
            <div className={styles.modal}>
                <p id="deleteDeck">Etes-vous sûr de vouloir supprimer ce deck ?</p>

                <div className={styles.buttons}>
                    <button onClick={handleClose}>Annuler</button>
                    <button className={styles.confirm} onClick={handleDelete}>Confirmer</button>
                </div>
            </div>
        </Modal>
    )
}

export default DecksDeleteModal