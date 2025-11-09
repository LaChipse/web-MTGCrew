/* eslint-disable react-hooks/set-state-in-effect */
import { MenuItem, Select } from '@mui/material'
import classNames from 'classnames'
import { MouseEvent, useEffect, useState } from 'react'
import Tombstone from '../../../components/Tombstone'
import Trophey from '../../../components/Trophey'
import { SELECT_MENU_STYLE, SELECT_STYLE } from '../../../Layouts/Theme/components/GamesFilter/StyleMui'
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
    const [matchConf, setMatchConf] = useState<Array<Record<string, string>>>(conf)
    const [showSettings, setShowSettings] = useState(false)
    const [anchor, setAnchor] = useState<DOMRect | null>(null);

    useEffect(() => {
        setStatePlayers((prev) => {
            if (Object.keys(prev).length > 0) return prev

            const newState: PlayerStateMap = {}

            matchConf.forEach((c) => {
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
        if (length === 3) {
            switch (index) {
                case 0:
                    return "1";
                case 1:
                    return "2"
                case 2:
                    return "1 / -1" 
                default:
                    break;
            }
        }
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

    const handleShowSettings = (event: MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setAnchor(rect);
        setShowSettings(!showSettings)
        
    }

    const handleChangeMatchConfig = (oldIndex: number, newIndex: number) => {
        const newArr = [...matchConf];
        [newArr[oldIndex], newArr[newIndex - 1]] = [newArr[newIndex - 1], newArr[oldIndex]];
        setMatchConf(newArr);
    }

    return (
        <div>
            <button className={styles.close} onClick={() => toggleDrawer(false)}>X</button>
            <button onClick={handleShowSettings} className={styles.settingsButton} />

            {showSettings && (
                <div
                    className={styles.settings} 
                    style={{
                        top: anchor!.bottom + 210 > window.innerHeight // si dépasse vers le bas
                            ? anchor!.top - 220 // place au-dessus
                            : anchor!.bottom + 5, // sinon en dessous
                        left: anchor!.left - 120}}
                    >
                    {matchConf.map((c, index) => (
                        <div className={styles.playerIndex}>
                            <p>{c.player}</p>
                            <Select
                                MenuProps={SELECT_MENU_STYLE}
                                sx={{
                                    ...SELECT_STYLE,
                                    height: '30px'
                                }}
                                id="Position"
                                value={index + 1}
                                onChange={(e) => handleChangeMatchConfig(index, Number(e.target.value))}
                            >
                                {
                                    matchConf.map((_, index) => (
                                        <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                    ))
                                }
                                </Select>
                        </div>
                    ))}
                </div>
            )}

            <div style={{ height: "100vh", width: "100%", ...gridCOnfig() }}>
                {matchConf.map((c, index) => (
                    <div
                        key={c.idPlayer}
                        className={classNames(styles.imgContainer, {[styles.deadthContainer]: !c.imageUrl && isPlayerDead(c.idPlayer)})}
                        style={{ gridColumn: getGridColumn(matchConf.length, index) }}
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
                                }
                            )} 
                            src={c.imageUrl}    
                            id={c.imageUrl} 
                        />

                        <div className={styles.title}>
                            <p>{c.player} {getPlayerState(c.idPlayer)}</p>
                            <span>{c.deckNom}</span>
                        </div>

                        <div className={classNames(styles.index, {[styles.impairIndex]: (index + 1) % 2 !== 0})}>
                            <p>{index + 1}</p>
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