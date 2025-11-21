import { ReactNode, SetStateAction, useEffect, useRef } from 'react'
import Historical from '../../../../components/svg/Historical'
import styles from './ActionMatch.module.scss'

type Props = {
    isOpenHistoric: boolean
    historics: Array<ReactNode>
    setOpenHistoric: (value: SetStateAction<boolean>) => void
    toggleDrawer: (isOpened: boolean) => void
}

const ActionMatch: React.FC<Props> = ({ isOpenHistoric, historics, setOpenHistoric, toggleDrawer }) => {
    const bottomRef = useRef<HTMLDivElement | null>(null)

    // Scroll bas à chaque update des historiques
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollTop = bottomRef.current.scrollHeight
        }
    }, [historics])

    return (
    <>
        <div className={styles.actionMatch}>
            <button className={styles.close} onClick={() => toggleDrawer(false)}>X</button>
            <Historical onClick={() => setOpenHistoric(!isOpenHistoric)} className={styles.historical} height='30px' width='30px' color='var(--primary)'></Historical>
        </div>

        {(isOpenHistoric && !!historics.length) && (
            <div className={styles.historicalModal} >
                <div ref={bottomRef}>
                    {
                        historics.map((h, index) => (
                            <div key={index}>{h}</div>
                        ))
                    }
                </div>
            </div>
        )}
    </>
)
}

export default ActionMatch