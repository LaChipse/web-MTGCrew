import AddIcon from '@mui/icons-material/Add';
import { Box, Checkbox, FormControl, IconButton, SelectChangeEvent } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import classNames from 'classnames';
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/fr';
import React, { MouseEvent, useState } from "react";
import { useAddGame } from '../../../hooks/queries/games/useAddGame';
import { useAppSelector } from '../../../hooks/useAppSelector';
import SmallLoading from '../../loader/SmallLoading/SmallLoading';
import { DATE_PICKER, STYLED_PAPER } from '../../../Layouts/Theme/StyleMui';
import PartieTypeFormStd from './Standard/PartieTypeFormStd/PartieTypeFormStd';
import PartieTypeFormSpec from './Special/PartieTypeFormSpec/PartieTypeFormSpec';
import PartiePlayersTypeFormStd from './Standard/PartiePlayersTypeFormStd/PartiePlayersTypeFormStd';
import PartiePlayersTypeFormSpec from './Special/PartiePlayersTypeFormSpec/PartiePlayersTypeFormSpec';
import PartieVictoryFormStd from './Standard/PartieVictoryFormStd/PartieVictoryFormStd';
import PartieVictoryFormSpec from './Special/PartieVictoryFormSpec/PartieVictoryFormSpec';
import styles from './DrawerGame.module.scss';

export interface PlayersBlock {
    joueur?: string,
    userId?: string,
    deck?: string,
    deckId?: string,
    team?: string,
    role?: string
}

type Props = {
    toggleDrawer: (newOpen: boolean) => void
}

const DrawerPartie: React.FC<Props> = ({ toggleDrawer }) => {
    const isStandard = useAppSelector((state) => state.type.isStandard);

    const [date, setDate] = useState<Dayjs | null>(dayjs())
    const [type, setType] = useState<string>('')
    const [configIndex, setConfigIndex] = useState<number>(1)
    const [config, setConfig] = useState<Array<PlayersBlock>>([{}])
    const [victoire, setVictoire] = useState<string>('')
    const [typeVictoire, setTypeVictoire] = useState<string>('')
    const [isRanked, setIsRanked] = useState(false)

    const { mutate, isPending } = useAddGame();

    const canAddPlayer = () => {
        switch (type) {
            case 'each':
                return !!(config[configIndex - 1]?.joueur && config[configIndex - 1]?.deck)
            case 'team' :
                return !!(config[configIndex - 1]?.joueur && config[configIndex - 1]?.deck && config[configIndex - 1]?.team)
            case 'treachery' :
            case 'archenemy' :
                return !!(config[configIndex - 1]?.joueur && config[configIndex - 1]?.deck && config[configIndex - 1]?.role)
            default:
                break;
        }
        
    }

    const resetState = () => {
        setConfigIndex(1)
        setConfig([{}])
        setVictoire('')
        setTypeVictoire('')
    }

    const handleTypeChange = (e: SelectChangeEvent<string>) => {
        setType(e.target.value)
        resetState()
    }

    const handleAddGameForm = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate({date, type, config, victoire, typeVictoire, isStandard, isRanked});
        
        setType('')
        setDate(null)
        resetState()

        setTimeout(() => {
            toggleDrawer(false)
        }, 1000); 
    };

    const handleResetForm = () => {
        setType('')
        setDate(null)
        resetState()
    }

    const hasValidConfig = () => {
        if (config.length !== configIndex) return true
        if (type === 'team') {
            if (config.every((element) => element.userId && element.deckId && element.team)) return false
        }
        else if (type === 'each' || (type !== 'archenemy' && type !== 'treachery')) {
            if (config.every(element => element.userId && element.deckId)) return false
        }
        else if (type === 'treachery' || type === 'archenemy') {
            if (config.every(element => element.userId && element.deckId && element.role)) return false
        }

        return true
    }

    return (
        <>
            <header className={styles.header}>
                <h2>Ajouter une partie</h2>
                <button style={{height: '30px', width: '30px'}} onClick={() => toggleDrawer(false)}>X</button>
            </header>

            <Box className={styles.drawer}>
                <h3> Configuration </h3>
                <div className={styles.firstBloc}>
                    <FormControl>
                        <label id="partieDate">Date de la partie</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                            <DesktopDatePicker 
                                slots={{
                                    desktopPaper: STYLED_PAPER,
                                }}  
                                sx={DATE_PICKER}
                                value={date} 
                                onChange={setDate}
                            />
                        </LocalizationProvider>
                    </FormControl>

                    { isStandard ? (
                        <PartieTypeFormStd type={type} handleTypeChange={handleTypeChange} />
                    ) : (
                        <PartieTypeFormSpec type={type} handleTypeChange={handleTypeChange} />
                    )}
                </div>

                { isStandard && ( <div style={{ width: '100%'}}>
                    <Checkbox
                        style={{color: 'var(--primary)'}}
                        checked={isRanked} 
                        onChange={() => setIsRanked(!isRanked)}
                    />
                    <label id='isRanked' style={{color: 'var(--white)', fontSize: 'medium'}}>Ranked ?</label>
                </div> )}

                { !!type.length && (isStandard ? (
                    <PartiePlayersTypeFormStd type={type} config={config} configIndex={configIndex} setConfig={setConfig} />
                ) : (
                    <PartiePlayersTypeFormSpec type={type} config={config} configIndex={configIndex} setConfig={setConfig} />
                )) }
                
                <IconButton className={styles.add} onClick={() => setConfigIndex((prev) => prev + 1)} disabled={!canAddPlayer()}>
                    <AddIcon className={styles.addIcon}/>
                </IconButton>

                { !!type.length && (isStandard ? (
                    <PartieVictoryFormStd config={config} setTypeVictoire={setTypeVictoire} setVictoire={setVictoire} type={type} typeVictoire={typeVictoire} victoire={victoire} />
                ) : (
                    <PartieVictoryFormSpec setTypeVictoire={setTypeVictoire} setVictoire={setVictoire} type={type} typeVictoire={typeVictoire} victoire={victoire} />
                ))}

                <div className={styles.buttons}>
                    <button
                        type="submit" 
                        disabled={!(type && victoire && typeVictoire) || isPending || hasValidConfig()}
                        onClick={handleAddGameForm}
                        className={classNames(styles.valide, {[styles.disabled]: !(type && victoire && typeVictoire) || isPending || hasValidConfig()})}
                    >
                        { isPending ? <SmallLoading heightContainer='100%' dimensionLoader='10px' borderWidth='3px' /> : 'Valider'}
                    </button>    

                    <button onClick={handleResetForm} >
                        Reset
                    </button>
                </div>
            </Box>
        </>
    )
}

export default DrawerPartie