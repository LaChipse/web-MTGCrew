import { ReactNode, SetStateAction } from 'react'
import Historical from '../../../../components/svg/Historical'
import styles from './ActionMatch.module.scss'

type Props = {
    isOpenHistoric: boolean
    historics: Array<ReactNode>
    setOpenHistoric: (value: SetStateAction<boolean>) => void
    toggleDrawer: (isOpened: boolean) => void
}

const ActionMatch: React.FC<Props> = ({ isOpenHistoric, historics, setOpenHistoric, toggleDrawer }) => (
    <>
        <div className={styles.actionMatch}>
            <button className={styles.close} onClick={() => toggleDrawer(false)}>X</button>
            <Historical onClick={() => setOpenHistoric(!isOpenHistoric)} className={styles.historical} height='30px' width='30px' color='var(--primary)'></Historical>
        </div>

        {isOpenHistoric && (
            <div className={styles.historicalModal}>
                {
                    historics.map((h) => (
                        <>{h}</>
                    ))
                }
            </div>
        )}
    </>
);

export default ActionMatch