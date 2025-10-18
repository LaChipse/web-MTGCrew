import { Button, Drawer, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useGetAllPlayers } from '../../../../hooks/queries/joueurs/useGetAllPlayers';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { clearGameFiltersState, setEndDate, setStartDate, setTypeOfVictory, setVictoryRole, setWinnerId } from '../../../../store/reducers/gameFiltersReducer';
import { ROLE_TYPE } from '../../../../utils/Enums/roleType';
import { TYPE_VICTORY } from '../../../../utils/Enums/victoryType';
import styles from './GamesFilter.module.scss';

type Props = {
    isOpen: boolean
    handleSetIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const GamesFilter: React.FC<Props> = ({ isOpen, handleSetIsOpen }) => {
    dayjs.locale('fr')
    const dispatch = useDispatch()
    const {data: users} = useGetAllPlayers()

    const isStandard = useAppSelector((state) => state.type.isStandard);
    const filters = useAppSelector((state) => state.gameFilters)

    return (
        <Drawer
            anchor={'bottom'}
            open={isOpen}
            onClose={() => handleSetIsOpen(false)}
        >
            <div className={styles.drawer}>
                <div className={styles.datePickers}>
                    <div>
                        <InputLabel id="startDate">Date de debut</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                            <DatePicker 
                                className={styles.datePicker} 
                                value={filters.startDate} 
                                onChange={(d) => dispatch(setStartDate(d!.startOf('day').add(1, 'second')))}
                                shouldDisableDate={(date) => date.isAfter(filters.endDate)}
                            />
                        </LocalizationProvider>
                    </div>
                    <div>
                        <InputLabel id="endDate">Date de fin</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                            <DatePicker 
                                className={styles.datePicker} 
                                value={filters.endDate} 
                                onChange={(d) => dispatch(setEndDate(d!.endOf('day')))} 
                                shouldDisableDate={(date) => date.isBefore(filters.startDate)}
                            />
                        </LocalizationProvider>
                    </div>
                </div>

                <div>
                    {isStandard ? (
                        <>
                            <InputLabel id="user">Vainqueur</InputLabel>
                            <Select
                                labelId="user"
                                id="userSelect"
                                defaultValue={undefined}
                                value={filters.winnerId}
                                onChange={(e) => dispatch(setWinnerId(e.target.value))} 
                                label="Joueurs vainqueurs"
                                className={styles.select}
                            >
                                {     
                                    users?.map((user) => (
                                        <MenuItem value={user.id} key={user.id}>
                                            {user.fullName}
                                        </MenuItem>
                                    ))   
                                }
                            </Select>
                        </>
                    ) : (
                        <>
                            <InputLabel id="victoire">Role victorieux</InputLabel>
                            <Select
                                labelId="victoire"
                                id="victoireSelect"
                                value={filters.victoryRole}
                                onChange={(e) => dispatch(setVictoryRole(e.target.value as ROLE_TYPE))} 
                                label="Role victorieux"
                                className={styles.select}
                            >
                                {
                                    Object.values(ROLE_TYPE).map((role) => (
                                        <MenuItem value={role} key={role}>
                                            {role}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </>
                    )}
                </div>

                <div>
                    <InputLabel id="typeOfVictory">Type de victoire</InputLabel>
                    <Select
                        labelId="typeOfVictory"
                        id="typeOfVictorySelect"
                        value={filters.typeOfVictory}
                        onChange={(e) => dispatch(setTypeOfVictory(e.target.value as TYPE_VICTORY))} 
                        label="Type de victoire"
                        className={styles.select}
                    >
                        {
                            Object.values(TYPE_VICTORY).map((t) => (
                                <MenuItem value={t} key={t}>
                                    {t}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </div>

                <Button onClick={() => dispatch(clearGameFiltersState())} className={styles.clearButton}>Vider</Button>
            </div>
        </Drawer>
    )
}

export default GamesFilter