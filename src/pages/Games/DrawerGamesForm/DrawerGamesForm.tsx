import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import classNames from 'classnames';
import { Dayjs } from "dayjs";
import 'dayjs/locale/fr';
import React, { MouseEvent, useState } from "react";
import { useAddGame } from '../../../hooks/queries/games/useAddGame';
import styles from './DrawerGamesForm.module.scss';
import EachPlayersBlock from "./PlayersBlock/EachPlayersBlock";
import TeamPlayersBlock from "./PlayersBlock/TeamPlayersBlock";
import TreacheryPlayersBlock from './PlayersBlock/TreacheryPlayersBlock';
import EachVictoryBlock from './VictoryBlock/EachVictoryBlock';
import TeamVictoryBlock from './VictoryBlock/TeamVictoryBlock';
import TreacheryVictoryBlock from './VictoryBlock/TreacheryVictoryBlock';

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

    const handleTypeChange = (e: SelectChangeEvent<string>) => {
        setType(e.target.value)
        setConfigIndex(1)
        setConfig([{}])
        setVictoire('')
        setTypeVictoire('')
    }

    const handleAddGameForm = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate({date, type, config, victoire, typeVictoire});
        
        setConfigIndex(1)
        setType('')
        setDate(null)
        setConfig([{}])
        setVictoire('')
        setTypeVictoire('')

        setTimeout(() => {
            toggleDrawer(false)
        }, 2000); 
    };

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
                            <h3> Victoire </h3>
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
                            <h3> Victoire </h3>
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
                            <h3> Victoire </h3>
                            <TreacheryVictoryBlock 
                                victoire={victoire}
                                setVictoire={setVictoire}
                                typeVictoire={typeVictoire}
                                setTypeVictoire={setTypeVictoire}
                            />
                        </>
                    )}

                <LoadingButton
                    loading={isPending} 
                    disabled={!(type && config && victoire && typeVictoire) || isPending} 
                    type="submit" 
                    variant="contained" 
                    onClick={handleAddGameForm} 
                    className={styles.submit}
                >
                    Valider
                </LoadingButton>      
            </Box>
        </>
    )
}

export default DrawerGamesForm