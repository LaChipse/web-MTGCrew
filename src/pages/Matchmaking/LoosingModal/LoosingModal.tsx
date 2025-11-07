import React from 'react';
import styles from './LoosingModal.module.scss';

type Props = {
    isFullWidth: boolean
    idPlayer: string
    open: boolean
    setOpen: (id: string, isDead: boolean) => void
}

const LoosingModal: React.FC<Props> = ({ isFullWidth, idPlayer, open, setOpen }) => (
    <div
        className={styles.modal}
        style={{ display: open ? 'block' : 'none', transform: `translate(calc(${isFullWidth ? '49vw' : '24vw'} - 80px), -50%)`}}
    >
        <div>
            <p id="deleteDeck">Avez-vous perdu ?</p>

            <div  className={styles.containt}>
                <button onClick={() => setOpen(idPlayer, false)}>Non</button>
                <button onClick={() => setOpen(idPlayer, true)}>Oui</button>
            </div>
        </div>
    </div>
)

export default LoosingModal