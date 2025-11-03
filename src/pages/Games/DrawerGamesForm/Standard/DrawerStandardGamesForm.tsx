import AddIcon from '@mui/icons-material/Add';
import { Box, CircularProgress, FormControl, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import classNames from 'classnames';
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/fr';
import React, { MouseEvent, useState } from "react";
import { useAddGame } from '../../../../hooks/queries/games/useAddGame';
import { SELECT_MENU_STYLE, SELECT_STYLE, STYLED_PAPER } from '../../../../Layouts/Theme/components/GamesFilter/StyleMui';
import EachPlayersBlock from './PlayersBlock/EachPlayersBlock';
import TeamPlayersBlock from './PlayersBlock/TeamPlayersBlock';
import EachVictoryBlock from './VictoryBlock/EachVictoryBlock';
import TeamVictoryBlock from './VictoryBlock/TeamVictoryBlock';
import styles from './DrawerStandardGamesForm.module.scss';

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

const DrawerStandardGamesForm: React.FC<Props> = ({ toggleDrawer }) => {
    const [date, setDate] = useState<Dayjs | null>(dayjs())
    const [type, setType] = useState<string>('')
    const [configIndex, setConfigIndex] = useState<number>(1)
    const [config, setConfig] = useState<Array<PlayersBlock>>([{}])
    const [victoire, setVictoire] = useState<string>('')
    const [typeVictoire, setTypeVictoire] = useState<string>('')

    const { mutate, isPending } = useAddGame();

    const canAddPlayer = () => {
        switch (type) {
            case 'each':
                return !!(config[configIndex - 1]?.joueur && config[configIndex - 1]?.deck)
            case 'team' :
                return !!(config[configIndex - 1]?.joueur && config[configIndex - 1]?.deck && config[configIndex - 1]?.team)
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
        mutate({date, type, config, victoire, typeVictoire, isStandard: true});
        
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
        else if (type !== 'team') {
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
                <h3> Configuration </h3>
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

                    <FormControl >
                        <label id="user">Mode de jeu</label>
                        <Select
                            MenuProps={SELECT_MENU_STYLE}
                            sx={SELECT_STYLE}
                            id="partieTypeSelect"
                            value={type}
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={'each'}>Chacun pour soi</MenuItem>
                            <MenuItem value={'team'}>Equipe</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {type === 'each' && (
                    <>
                        <h3> Joueurs </h3>
                        <EachPlayersBlock
                            config={config}
                            setConfig={setConfig}
                            configIndex={configIndex}
                        />
                    </>
                )}

                {type === 'team' && (
                    <>
                        <h3> Equipes </h3>
                        <TeamPlayersBlock
                            config={config}
                            setConfig={setConfig}
                            configIndex={configIndex}
                        />
                    </>
                )}
                
                <IconButton className={classNames([styles.add, { [styles.hasPlayer]: !!type }])} onClick={() => setConfigIndex((prev) => prev + 1)} disabled={!canAddPlayer()}>
                    <AddIcon className={styles.addIcon}/>
                </IconButton>

                {type === 'each' && (
                    <>
                        <h3> Vainqueur </h3>
                        <EachVictoryBlock 
                            joueurs={config.map((conf) => ({joueur: conf.joueur, userId: conf.userId}))
                                .filter((item, index, self) => index === self
                                .findIndex((t) => t.userId === item.userId)
                            )}
                            victoire={victoire}
                            setVictoire={setVictoire}
                            typeVictoire={typeVictoire}
                            setTypeVictoire={setTypeVictoire}
                        />
                    </>
                )}

                {type === 'team' && (
                    <>
                        <h3> Equipe victorieuse </h3>
                        <TeamVictoryBlock 
                            equipes={[...new Set(config.map((conf) => (conf.team)))]}
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
                        {isPending ? <CircularProgress style={{ width: '10px', height: '10px', color: 'var(--primary)' }}/> : 'Valider'}
                    </button>    

                    <button onClick={handleResetForm} >
                        Reset
                    </button>
                </div>
            </Box>
        </>
    )
}

export default DrawerStandardGamesForm