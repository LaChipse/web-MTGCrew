import AddIcon from '@mui/icons-material/Add';
import { Box, FormControl, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import classNames from 'classnames';
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/fr';
import React, { MouseEvent, useState } from "react";
import { useAddGame } from '../../../../hooks/queries/games/useAddGame';
import { SELECT_MENU_STYLE, SELECT_STYLE, STYLED_PAPER } from '../../../../Layouts/Theme/components/GamesFilter/StyleMui';
import SmallLoading from '../../../loader/SmallLoading/SmallLoading';
import ArchenemyPlayersBlock from './PlayersBlock/ArchenemyPlayersBlock';
import TreacheryPlayersBlock from './PlayersBlock/TreacheryPlayersBlock';
import ArchenemyVictoryBlock from './VictoryBlock/ArchenemyVictoryBlock';
import TreacheryVictoryBlock from './VictoryBlock/TreacheryVictoryBlock';
import styles from './DrawerSpecialGamesForm.module.scss';

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

const DrawerSpecialGamesForm: React.FC<Props> = ({ toggleDrawer }) => {
    const [date, setDate] = useState<Dayjs | null>(dayjs())
    const [type, setType] = useState<string>('')
    const [configIndex, setConfigIndex] = useState<number>(1)
    const [config, setConfig] = useState<Array<PlayersBlock>>([{}])
    const [victoire, setVictoire] = useState<string>('')
    const [typeVictoire, setTypeVictoire] = useState<string>('')

    const { mutate, isPending } = useAddGame();

    const canAddPlayer = () => {
        switch (type) {
            case 'treachery' :
                return !!(config[configIndex - 1]?.joueur && config[configIndex - 1]?.deck && config[configIndex - 1]?.role)
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
        mutate({date, type, config, victoire, typeVictoire, isStandard: false});
        
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
        if (type === 'treachery' || type === 'archenemy') {
            if (config.every(element => element.userId && element.deckId && element.role)) return false
        }
        else if (type !== 'archenemy' && type !== 'treachery') {
            if (config.every(element => element.userId && element.deckId)) return false
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
                <h3> Partie </h3>
                <div className={styles.firstBloc}>
                    <FormControl className={styles.datePickerForm}>
                        <label id="partieDate">Date de la partie</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                            <DesktopDatePicker 
                                slots={{
                                    desktopPaper: STYLED_PAPER,
                                }}  
                                className={styles.datePicker} 
                                value={date} 
                                onChange={setDate}
                            />
                        </LocalizationProvider>
                    </FormControl>

                    <FormControl>
                        <label id="partieType">Type de partie</label>
                        <Select
                            MenuProps={SELECT_MENU_STYLE}
                            sx={SELECT_STYLE}
                            id="partieTypeSelect"
                            value={type}
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={'treachery'}>Treachery</MenuItem>
                            <MenuItem value={'archenemy'}>Archenemy</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {type === 'treachery' && (
                    <>
                        <h3>Joueurs et Rôles</h3>
                        <TreacheryPlayersBlock
                            config={config}
                            setConfig={setConfig}
                            configIndex={configIndex}
                        />
                    </>
                )}

                {type === 'archenemy' && (
                    <>
                        <h3>Joueurs et Rôles</h3>
                        <ArchenemyPlayersBlock
                            config={config}
                            setConfig={setConfig}
                            configIndex={configIndex}
                        />
                    </>
                )}
                
                <IconButton className={styles.add} onClick={() => setConfigIndex((prev) => prev + 1)} disabled={!canAddPlayer()}>
                    <AddIcon className={styles.addIcon}/>
                </IconButton>

                {type === 'treachery' && (
                    <>
                        <h3> Rôle victorieux </h3>
                        <TreacheryVictoryBlock 
                            victoire={victoire}
                            setVictoire={setVictoire}
                            typeVictoire={typeVictoire}
                            setTypeVictoire={setTypeVictoire}
                        />
                    </>
                )}

                {type === 'archenemy' && (
                    <>
                        <h3> Rôle victorieux </h3>
                        <ArchenemyVictoryBlock 
                            victoire={victoire}
                            setVictoire={setVictoire}
                            typeVictoire={typeVictoire}
                            setTypeVictoire={setTypeVictoire}
                        />
                    </>
                )}

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

export default DrawerSpecialGamesForm