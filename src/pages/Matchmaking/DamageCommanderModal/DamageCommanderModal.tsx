import { MenuItem, Modal, Select } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { SELECT_MENU_STYLE, SELECT_STYLE } from '../../../Layouts/Theme/components/GamesFilter/StyleMui';
import NumberSpinnerInput from './NumberSpinnerInput/NumberSpinnerInput';
import classNames from 'classnames';
import styles from './DamageCommanderModal.module.scss'

type Props = {
    conf: Array<Record<string, string>>
    open: boolean
    handleSetDamageCommander: (from: string, to: string, damage: number) => void
    onSetOpen: Dispatch<SetStateAction<boolean>>
}

interface DamageCommanderState {
    from: string
    to: string
    damage: number
}

const DamageCommanderModal: React.FC<Props> = ({ conf, open, handleSetDamageCommander, onSetOpen}) => {
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
                            {conf.map((c) => (

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
                            {conf.map((c) => (

                                <MenuItem value={c.idPlayer}>{c.player}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div style={{marginTop: 'auto', display: 'flex', gap: '10px'}}>
                        <button 
                            disabled={!damageCommanderState.from || !damageCommanderState.to} 
                            onClick={() => handleSetDamageCommander(damageCommanderState.from, damageCommanderState.to, damageCommanderState.damage)}
                            className={classNames({[styles.disabled]: !damageCommanderState.from || !damageCommanderState.to})}
                        >
                            Ok
                        </button>
                        <button onClick={() => onSetOpen(false)}>X</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DamageCommanderModal