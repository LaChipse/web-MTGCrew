import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from "dayjs";
import 'dayjs/locale/fr';
import React, { MouseEvent, useState } from "react";
import { useAddGame } from '../../../hooks/queries/games/useAddGame';
import EachPlayersBlock from "./PlayersBlock/EachPlayersBlock";
import TeamPlayersBlock from "./PlayersBlock/TeamPlayersBlock";
import TreacheryPlayersBlock from './PlayersBlock/TreacheryPlayersBlock';
import EachVictoryBlock from './VictoryBlock/EachVictoryBlock';
import TeamVictoryBlock from './VictoryBlock/TeamVictoryBlock';
import TreacheryVictoryBlock from './VictoryBlock/TreacheryVictoryBlock';
import classNames from 'classnames';
import styles from './DrawerGamesForm.module.scss';

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

const DrawerGamesForm: React.FC<Props> = ({ toggleDrawer }) => {
    const [date, setDate] = useState<Dayjs | null>(null)
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
            case 'treachery' :
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
        mutate({date, type, config, victoire, typeVictoire});
        
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
        if (type === 'treachery') {
            if (config.every(element => element.userId && element.deckId && element.role)) return false
        }
        else if (type !== 'team' && type !== 'treachery') {
            if (config.every(element => element.userId && element.deckId)) return false
        }
            
        return true
    }

    return (
        <>
            <header className={styles.header}>
                <h2>Ajouter une partie</h2>
                <IconButton onClick={() => toggleDrawer(false)} style={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </header>

            <Box className={styles.drawer}>
                    <h3> Partie </h3>
                    <div className={styles.firstBloc}>
                        <FormControl className={styles.datePickerForm}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                                <DatePicker label="Date de la partie" value={date} onChange={setDate}/>
                            </LocalizationProvider>
                        </FormControl>

                        <FormControl size='small'>
                            <InputLabel id="partieType">Type de partie</InputLabel>
                            <Select
                                labelId="partieType"
                                id="partieTypeSelect"
                                value={type}
                                onChange={handleTypeChange}
                                label="Type de partie"
                            >
                                <MenuItem value={'each'}>Chacun pour soit</MenuItem>
                                <MenuItem value={'team'}>Equipe</MenuItem>
                                <MenuItem value={'treachery'}>Treachery</MenuItem>
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

                    {type === 'treachery' && (
                        <>
                            <h3> Joueurs et Rôles</h3>
                            <TreacheryPlayersBlock
                                config={config}
                                setConfig={setConfig}
                                configIndex={configIndex}
                            />
                        </>
                    )}
                    
                    <IconButton className={classNames([styles.addIcon, { [styles.hasPlayer]: !!type }])} onClick={() => setConfigIndex((prev) => prev + 1)} disabled={!canAddPlayer()}>
                        <AddIcon />
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

                <div className={styles.buttons}>
                    <LoadingButton
                        loading={isPending} 
                        disabled={!(type && victoire && typeVictoire) || isPending || hasValidConfig()} 
                        type="submit" 
                        variant="contained" 
                        onClick={handleAddGameForm}
                    >
                        Valider
                    </LoadingButton>    

                    <Button className={styles.reset} onClick={handleResetForm} >
                        Reset
                    </Button>
                </div>
            </Box>
        </>
    )
}

export default DrawerGamesForm