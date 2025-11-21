import { MenuItem, Modal, Select } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { SELECT_MENU_STYLE, SELECT_STYLE } from '../../../Layouts/Theme/StyleMui';
import NumberSpinnerInput from './NumberSpinnerInput/NumberSpinnerInput';
import classNames from 'classnames';
import { PlayerStateMap } from '../Match/Match';
import styles from './DamageCommanderModal.module.scss'

type Props = {
    statePlayers: PlayerStateMap
    conf: Array<Record<string, string>>
    open: boolean
    onSetDamageCommander: (from: string, to: string, damage: number) => void
    onSetOpen: Dispatch<SetStateAction<boolean>>
}

interface DamageCommanderState {
    from: string
    to: string
    damage: number
}

const DamageCommanderModal: React.FC<Props> = ({ statePlayers, conf, open, onSetDamageCommander, onSetOpen}) => {
    const [damageCommanderState, setDamageCommanderState] = useState<DamageCommanderState>({damage: 0} as DamageCommanderState)

    const handleAttackingPlayerChange = (attackingPlayer: string) => {
        setDamageCommanderState((prev) => ({...prev, from: attackingPlayer}))
    }

    const handleDefendingPlayerChange = (defendingPlayer: string) => {
        setDamageCommanderState((prev) => ({...prev, to: defendingPlayer}))
    }

    const handleDamageChange = (damage: number) => {
        setDamageCommanderState((prev) => ({...prev, damage}))
    }

    const handleClose = () => {
        onSetOpen(false);
        setDamageCommanderState({damage: 0} as DamageCommanderState)
    }

    const handleSetDamageCommander = () => {
        onSetDamageCommander(damageCommanderState.from, damageCommanderState.to, damageCommanderState.damage);
        setDamageCommanderState({damage: 0} as DamageCommanderState)
    }

    const getDamagedCommander = (defensorId: string) => {
        if (damageCommanderState.from) return (`(${statePlayers[damageCommanderState.from].damageCommander[defensorId] || 0})`)
        return ''
    }

    return (
        <Modal
            open={open}
            aria-labelledby="damageCommandant"
            aria-describedby="damage commandant"
            style={{ backdropFilter: 'blur(1px)'}}
        >
            <div className={styles.container}>
                <div className={styles.bloc}>
                    <div className={styles.stateInput}>
                        <label id="attacking">Attaquant</label>
                        <Select
                            MenuProps={SELECT_MENU_STYLE}
                            sx={SELECT_STYLE}
                            style={{width: '150px'}}
                            id="attackSelect"
                            value={damageCommanderState.from || ''}
                            onChange={(e) => handleAttackingPlayerChange(e.target.value as string)}
                        >
                            {conf.filter((c) => damageCommanderState.to ? c.idPlayer !== damageCommanderState.to : c).map((c) => (
                                <MenuItem value={c.idPlayer}>{c.player}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div  className={styles.stateInput} style={{textAlign: 'center'}}>
                        <label id="damage">Damage</label>
                        <NumberSpinnerInput 
                            min={0} 
                            max={21} 
                            onChange={handleDamageChange} 
                            step={1} 
                            value={damageCommanderState.damage}>
                        </NumberSpinnerInput>
                    </div>
                </div>
                <div className={styles.bloc} style={{justifyContent: 'space-between'}}>
                    <div  className={styles.stateInput}>
                        <label id="defensor">Defenseur</label>
                        <Select
                            MenuProps={SELECT_MENU_STYLE}
                            sx={SELECT_STYLE}
                            style={{width: '150px'}}
                            id="defenseSelect"
                            value={damageCommanderState.to || ''}
                            onChange={(e) => handleDefendingPlayerChange(e.target.value as string)}
                        >
                            {conf.filter((c) => damageCommanderState.from ? c.idPlayer !== damageCommanderState.from : c).map((c) => (
                                <MenuItem value={c.idPlayer}>{`${c.player} ${getDamagedCommander(c.idPlayer)}`}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div style={{marginTop: 'auto', display: 'flex', gap: '15px'}}>
                        <button 
                            disabled={!damageCommanderState.from || !damageCommanderState.to} 
                            onClick={handleSetDamageCommander}
                            className={classNames({[styles.disabled]: !damageCommanderState.from || !damageCommanderState.to})}
                        >
                            Valider
                        </button>
                        <button style={{padding: '5px 9px'}} onClick={handleClose}>X</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DamageCommanderModal