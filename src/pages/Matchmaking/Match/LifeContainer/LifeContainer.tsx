import classNames from 'classnames'
import { PlayerStateMap } from '../Match'
import styles from './LifeContainer.module.scss'

type Props = {
    isModalPlayerOpen: boolean
    statePlayers: PlayerStateMap
    idPlayer: string
    isFading: boolean
    lifeChangeCount: number
    isPlayerDead: (idPlayer: string) => boolean
    areAllOtherDead: (idPlayer: string) => boolean
}

const LifeContainer: React.FC<Props> = ({ isModalPlayerOpen, statePlayers, idPlayer, isFading, lifeChangeCount, isPlayerDead, areAllOtherDead }) => (
    <div className={styles.lifeContainer}>
        <div style={{display: 'flex', flexDirection: 'column', margin: 'auto'}} className={classNames({[styles.displayLife]: isModalPlayerOpen})}>
            <h2 className={styles.life}>
                    <span 
                        className={classNames({[styles.deadLife]: isPlayerDead(idPlayer), [styles.winnerLife]: areAllOtherDead(idPlayer)})} 
                    >
                        {statePlayers?.[idPlayer]?.life ?? 40}
                    </span>
            </h2>
        </div>
            {(lifeChangeCount || lifeChangeCount === 0) && (
                <span className={classNames(styles.lifeChange, {[styles.fadeOut]: isFading})}>( {lifeChangeCount} )</span>
            )}
    </div>
);

export default LifeContainer