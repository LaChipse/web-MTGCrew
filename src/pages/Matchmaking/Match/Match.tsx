/* eslint-disable react-hooks/set-state-in-effect */
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Sortable from 'sortablejs'
import Tombstone from '../../../components/Tombstone'
import Trophey from '../../../components/Trophey'
import LoosingModal from '../LoosingModal/LoosingModal'
import styles from './Match.module.scss'
import DamageCommanderModal from '../DamageCommanderModal/DamageCommanderModal'
import Shield from '../../../components/Shield'

type Props = {
    toggleDrawer: (isOpened: boolean) => void
    conf: Array<Record<string, string>>
}

type PlayerState = {
    life: number
    poison: number
    dead: boolean
    isAlmostDead: boolean
    damageCommander: Record<string, number>
}

export type PlayerStateMap = Record<string, PlayerState>

const Match: React.FC<Props> = ({ conf, toggleDrawer }) => {
    const [statePlayers, setStatePlayers] = useState<PlayerStateMap>({});
    const [modalPlayerOpen, setModalPlayerOpen] = useState<Record<string, boolean>>({})
    const [hited, setHited] = useState<Record<string, boolean>>({})
    const [healed, setHealed] = useState<Record<string, boolean>>({})
    const [showSettings, setShowSettings] = useState(false)
    const [matchConf, setMatchConf] = useState(conf)
    const [commanderModalIsOpen, setCommanderModalIsOpen] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null);
    const matchConfRef = useRef(matchConf);

    useEffect(() => {
        matchConfRef.current = matchConf;
    }, [matchConf]);

    useEffect(() => {
        if (!containerRef.current || !matchConfRef) return;

        const sortable = Sortable.create(containerRef.current, {
            swapThreshold: 0.65,
            draggable: ".draggable",
            handle: ".drag-handle",

            onMove(evt) {
                const newArr = [...matchConfRef.current]; 
                [newArr[Number(evt.related.id)], 
                newArr[Number(evt.dragged.id)]] = [newArr[Number(evt.dragged.id)], newArr[Number(evt.related.id)]]; 
                setMatchConf(newArr);
            },
        });

        return () => sortable.destroy();
    }, []);

    useEffect(() => {
        const othersPlayers = (id: string) => matchConf
            .filter((c) => c.idPlayer !== id)
            .reduce((acc, c) => ({ ...acc, [c.idPlayer]: 0 }), {} as Record<string, number>);

        setStatePlayers((prev) => {
            if (Object.keys(prev).length > 0) return prev

            const newState: PlayerStateMap = {}

            matchConf.forEach((c) => {
                newState[c.idPlayer] = {
                    life: 40,
                    poison: 0,
                    dead: false,
                    isAlmostDead: false,
                    damageCommander: {...othersPlayers(c.idPlayer)}
                }
            })

            return newState
        })

        setModalPlayerOpen((prev) => {
            if (Object.keys(prev).length > 0) return prev

            const newState: Record<string, boolean> = {}

            matchConf.forEach((c) => {
                newState[c.idPlayer] = false
            })

            return newState
        })

        const handleResize = () => {
            if (showSettings) setShowSettings(false);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [matchConf, showSettings])

    const gridCOnfig = () => {
        switch (matchConf.length) {
            case 1:
            case 2:
                return {display: "grid"}
            case 3:
            case 4 :
                return {display: "grid", 'gridTemplateColumns': '1fr 1fr'}
            case 5 :
                return {display: "grid", 'gridTemplateColumns': '1fr 1fr 1fr 1fr 1fr 1fr'}
            default:
                return {display: "grid"};
        }
    }

    const isFullWidth = (i: number) => {
        if (matchConf.length === 2 || matchConf.length === 1) return true
        if (matchConf.length === 3 && i === 2) return true
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
        if (length === 3 ) {
            switch (index) {
                case 0:
                    return '1'
                case 1:
                    return '2'
                case 2:
                    return '1 / -1'
                default:
                    break;
            }
        } 

        if (length === 5 ) {
            switch (index) {
                case 0:
                    return '1 / 3'
                case 1:
                    return '3 / 5'
                case 2:
                    return '5 / 7'
                case 3:
                    return '1 / 4'
                case 4:
                    return '4 / 7'
                default:
                    break;
            }
        } 
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
        if (isAlomstDeadByCommander(id)) return <Shield className={styles.shiedlIcon} height='20px' width='20px' color='var(--error)'/>
    }

    const isAlomstDeadByCommander = (idPlayer: string) => {
        return Object.values(statePlayers).some((playerState) =>
            ((playerState.damageCommander[idPlayer] ?? 0) > 17) && ((playerState.damageCommander[idPlayer] ?? 0) < 21)
        );
    }

    const handleSetDamageCommander = (from: string, to: string, damage: number) => {
        setStatePlayers((prev) => ({
            ...prev,
            [from]: {
                ...prev[from],
                damageCommander: {
                    ...prev[from].damageCommander,
                    [to]: damage,
                }, 
            },
            [to]: {
                ...prev[to],
                dead: damage > 20
            }
        }))

        if (damage > 20) {
            setModalPlayerOpen((prev) => ({
                ...prev,
                [to]: true,
            }))
        }

        setTimeout(() => {
            setCommanderModalIsOpen(false)
        }, 200)
    }

    return (
        <div>
            <button className={styles.close} onClick={() => toggleDrawer(false)}>X</button>
            <div className={styles.commanderButton}>
                <Shield onClick={() => setCommanderModalIsOpen(true)} height='50px' width='50px' color='var(--primary)'/>
            </div>
            <DamageCommanderModal statePlayers={statePlayers} onSetOpen={setCommanderModalIsOpen} open={commanderModalIsOpen} conf={matchConf} onSetDamageCommander={handleSetDamageCommander} />

            <div ref={containerRef} style={{ height: "100vh", width: "100%", ...gridCOnfig() }}>
                {matchConf.map((c, index) => (
                    <div
                        key={c.idPlayer}
                        data-id={c.idPlayer}
                        id={`${index}`}
                        className={
                            classNames('draggable', styles.imgContainer, 
                                {
                                    [styles.deadthContainer]: !c.imageUrl && isPlayerDead(c.idPlayer), 
                                    [styles.responsiveCard]: (matchConf.length !== 5) || (matchConf.length === 5 && (index === 3 || index === 4))
                                }
                            )
                        }
                        style={{ gridColumn: getGridColumn(matchConf.length, index) }}
                        data-bg={c.imageUrl}
                    >  
                        <div className={classNames("drag-handle", styles.draggableButton)} style={{ position: 'absolute', zIndex: 100000, color: 'var(--white)', bottom: 0,marginLeft: '10px', margin: '5px', left: 0}}>☰</div>
                        <button className={classNames(styles.lifeButtonLess, {[styles.hitedButton]: hited[c.idPlayer]})} disabled={modalPlayerOpen[c.idPlayer]} onClick={() => {changeLife(c.idPlayer, -1)}}>-</button>

                        <img 
                            key={`img-${c.idPlayer}`} 
                            className={classNames(
                                styles.img, 
                                {
                                    [styles.dead]: isPlayerDead(c.idPlayer), 
                                    [styles.winner]: areAllOtherDead(c.idPlayer), 
                                    [styles.almostDead]: isAlmostDead(c.idPlayer),
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
        </div>
    );
}

export default Match