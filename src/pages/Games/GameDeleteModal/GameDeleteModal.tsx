import { Modal } from '@mui/material';
import React from 'react';
import { useDeleteGame } from '../../../hooks/queries/games/useDeleteGame';
import styles from './GameDeleteModal.module.scss';

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
            style={{ backdropFilter: 'blur(3px)'}}
        >
            <div className={styles.modal}>
                <p id="deleteGame">Etes-vous sûr de vouloir supprimer cette partie ?</p>

                <div className={styles.buttons}>
                    <button onClick={handleClose}>Annuler</button>
                    <button className={styles.confirm} onClick={handleDelete}>Confirmer</button>
                </div>
            </div>
        </Modal>
    )
}

export default GameDeleteModal