/* eslint-disable react-hooks/set-state-in-effect */
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Tombstone from '../../../components/Tombstone'
import Trophey from '../../../components/Trophey'
import LoosingModal from '../LoosingModal/LoosingModal'
import styles from './Match.module.scss'

type Props = {
    toggleDrawer: (isOpened: boolean) => void
    conf: Array<Record<string, string>>
}

type PlayerState = {
    life: number
    poison: number
    dead: boolean
    isAlmostDead: boolean
}

type PlayerStateMap = Record<string, PlayerState>

const Match: React.FC<Props> = ({ conf, toggleDrawer }) => {
    const [statePlayers, setStatePlayers] = useState<PlayerStateMap>({});
    const [modalPlayerOpen, setModalPlayerOpen] = useState<Record<string, boolean>>({})
    const [hited, setHited] = useState<Record<string, boolean>>({})
    const [healed, setHealed] = useState<Record<string, boolean>>({})

    useEffect(() => {
        setStatePlayers((prev) => {
            if (Object.keys(prev).length > 0) return prev

            const newState: PlayerStateMap = {}

            conf.forEach((c) => {
                newState[c.idPlayer] = {
                    life: 40,
                    poison: 0,
                    dead: false,
                    isAlmostDead: false,
                }
            })

            return newState
        })

        setModalPlayerOpen((prev) => {
            if (Object.keys(prev).length > 0) return prev

            const newState: Record<string, boolean> = {}

            conf.forEach((c) => {
                newState[c.idPlayer] = false
            })

            return newState
        })
    }, [conf])


    const gridCOnfig = () => {
        switch (conf.length) {
            case 1:
            case 2:
                return {display: "grid"}
            case 3:
            case 4 :
                return {display: "grid", 'gridTemplateColumns': '1fr 1fr'}
            default:
                return {display: "grid"};
        }
    }

    const isFullWidth = (i: number) => {
        if (conf.length === 2 || conf.length === 1) return true
        if (conf.length === 3 && i === 2) return true
        return false
    }

    const changeLife = (id: string, delta: number) => {
        if (delta === -1 ) setHited({[id]: true})
        if (delta === 1) setHealed({[id]: true})
            
        setStatePlayers((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                life: prev[id].life + delta,
                dead: prev[id].life + delta <= 0,
                isAlmostDead: (prev[id].life + delta <= 10) && (prev[id].life + delta > 0),
            },
        }))

        if (statePlayers[id].life == 1 && delta === -1) {
            setModalPlayerOpen((prev) => ({
                ...prev,
                [id]: true,
            }))
        }
        setTimeout(() => setHited({[id]: false}), 300);
        setTimeout(() => setHealed({[id]: false}), 300);
    }

    const getGridColumn = (length: number, index: number ) => {
        if (length === 3 && index === 2) return "1 / -1"
        return 0
    }

    const handleClose = (id: string, isDead: boolean) => {
        setModalPlayerOpen((prev) => ({
            ...prev,
            [id]: false,
        }))

        setStatePlayers((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                dead: isDead,
            },
        }))
    }

    const isPlayerDead = (idPlayer: string) => {
        return statePlayers[idPlayer] && statePlayers[idPlayer].dead
    }

    const isAlmostDead = (idPlayer: string) => {
        return statePlayers[idPlayer] && statePlayers[idPlayer].isAlmostDead
    }

    const areAllOtherDead = (idPlayer: string) => {
        return Object.entries(statePlayers)
            .filter(([playerId]) => playerId !== idPlayer)
            .every(([, player]) => player.dead);
    }

    const getPlayerState = (id: string) => {
        if (isPlayerDead(id)) return <Tombstone height='20px' width='20px' color='var(--error)'/>
        if (areAllOtherDead(id)) return <Trophey height='20px' width='20px' color='var(--success)'/>
    }

    return (
        <>
            <button className={styles.close} onClick={() => toggleDrawer(false)}>X</button>
            <div style={{ height: "100vh", width: "100%", ...gridCOnfig() }}>
                {conf.map((c, index) => (
                    <div
                        key={c.idPlayer}
                        className={classNames(styles.imgContainer, {[styles.deadthContainer]: !c.imageUrl && isPlayerDead(c.idPlayer)})}
                        style={{ gridColumn: getGridColumn(conf.length, index) }}
                        data-bg={c.imageUrl}
                    >  

                        <button className={classNames(styles.lifeButtonLess, {[styles.hitedButton]: hited[c.idPlayer]})} disabled={modalPlayerOpen[c.idPlayer]} onClick={() => {changeLife(c.idPlayer, -1)}}>-</button>

                        <img 
                            key={`img-${c.idPlayer}`} 
                            className={classNames(
                                styles.img, 
                                {
                                    [styles.dead]: isPlayerDead(c.idPlayer), 
                                    [styles.winner]: areAllOtherDead(c.idPlayer), 
                                    [styles.almostDead]: isAlmostDead(c.idPlayer), 
                                    [styles.hited]: hited[c.idPlayer],
                                    [styles.healed]: healed[c.idPlayer],
                                }
                            )} 
                            src={c.imageUrl}    
                            id={c.imageUrl} 
                        />

                        <div className={styles.title}>
                            <p>{c.player} {getPlayerState(c.idPlayer)}</p>
                            <span>{c.deckNom}</span>
                        </div>

                        <LoosingModal idPlayer={c.idPlayer} open={modalPlayerOpen[c.idPlayer]} setOpen={handleClose} isFullWidth={isFullWidth(index)}/>

                        <div className={styles.lifeContainer}>
                                <div style={{display: 'flex', flexDirection: 'column', margin: 'auto'}} className={classNames({[styles.displayLife]: modalPlayerOpen[c.idPlayer]})}>
                                    <h2 className={styles.life}>
                                            <span 
                                                className={classNames({[styles.deadLife]: isPlayerDead(c.idPlayer), [styles.winnerLife]: areAllOtherDead(c.idPlayer)})} 
                                            >
                                                {statePlayers?.[c.idPlayer]?.life ?? 40}
                                            </span>
                                    </h2>
                                </div>
                        </div>

                        <button className={classNames(styles.lifeButtonPlus, {[styles.healedButton]: healed[c.idPlayer]})} disabled={modalPlayerOpen[c.idPlayer]} onClick={() => {changeLife(c.idPlayer, 1)}}>+</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Match