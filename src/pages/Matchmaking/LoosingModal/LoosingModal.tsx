import React from 'react';
import styles from './LoosingModal.module.scss';

type Props = {
    widthDecalage: number
    idPlayer: string
    open: boolean
    setOpen: (id: string, isDead: boolean) => void
}

const LoosingModal: React.FC<Props> = ({ widthDecalage, idPlayer, open, setOpen }) => (
    <div
        className={styles.modal}
        style={{ display: open ? 'block' : 'none', transform: `translate(calc(${widthDecalage}vw - 59px), -50%)`}}
    >
        <div>
            <p id="deleteDeck">Mort ?</p>

            <div  className={styles.containt}>
                <button onClick={() => setOpen(idPlayer, false)}>Non</button>
                <button onClick={() => setOpen(idPlayer, true)}>Oui</button>
            </div>
        </div>
    </div>
)

export default LoosingModal