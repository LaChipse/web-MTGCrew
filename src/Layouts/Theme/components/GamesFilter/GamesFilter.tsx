import { MenuItem, Select } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useGetAllPlayers } from '../../../../hooks/queries/joueurs/useGetAllPlayers';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { clearGameFiltersState, setEndDate, setIsRanked, setStartDate, setTypeOfVictory, setVictoryRole, setWinnerId } from '../../../../store/reducers/gameFiltersReducer';
import { ROLE_TYPE } from '../../../../utils/Enums/roleType';
import { TYPE_VICTORY } from '../../../../utils/Enums/victoryType';
import { SELECT_MENU_STYLE, SELECT_STYLE, STYLED_PAPER } from './StyleMui';
import styles from './GamesFilter.module.scss';

const GamesFilter: React.FC = () => {
    dayjs.locale('fr')
    const dispatch = useDispatch()
    const {data: users} = useGetAllPlayers()

    const isStandard = useAppSelector((state) => state.type.isStandard);
    const filters = useAppSelector((state) => state.gameFilters)
    
    return (
        <div className={styles.blockFilters}>
            
            <div className={styles.datePickers}>
                <button onClick={() => dispatch(clearGameFiltersState())} className={styles.clearButton}>
                <div className={styles.clearButtonIcon} />
            </button>
                <div className={styles.filtre}>
                    <label id="startDate">Date de debut</label>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                        <DesktopDatePicker 
                            slots={{
                                desktopPaper: STYLED_PAPER,
                            }} 
                            className={styles.datePicker}
                            value={filters.startDate ? dayjs(filters.startDate) : null} 
                            onChange={(date) => {
                                if (!date) return;
                                const formatted = date.startOf('day').add(1, 'second').toISOString();
                                dispatch(setStartDate(formatted));
                            }}
                            shouldDisableDate={(date) => date.isAfter(filters.endDate)}
                        />
                    </LocalizationProvider>
                </div>
                <div className={styles.filtre}>
                    <label id="endDate">Date de fin</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                        <DesktopDatePicker 
                            slots={{
                                desktopPaper: STYLED_PAPER,
                            }} 
                            className={styles.datePicker} 
                            value={filters.endDate ? dayjs(filters.endDate) : null}
                            onChange={(date) => {
                                if (!date) return;
                                const formatted = date.endOf('day').add(1, 'second').toISOString();
                                dispatch(setEndDate(formatted));
                            }}
                            shouldDisableDate={(date) => date.isBefore(filters.startDate)}
                        />
                    </LocalizationProvider>
                </div>
            </div>

            <div className={styles.filtres}>
                {isStandard ? (
                    <div className={styles.filtre}>
                        <label id="user">Vainqueur</label>
                        <Select
                            MenuProps={SELECT_MENU_STYLE}
                            sx={SELECT_STYLE}
                            id="userSelect"
                            value={filters.winnerId}
                            onChange={(e) => dispatch(setWinnerId(e.target.value))} 
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
                    </div>
                ) : (
                    <div className={styles.filtre}>
                        <label id="victoire">Role victorieux</label>
                        <Select
                            MenuProps={SELECT_MENU_STYLE}
                            sx={SELECT_STYLE}
                            id="victoireSelect"
                            value={filters.victoryRole}
                            onChange={(e) => dispatch(setVictoryRole(e.target.value as ROLE_TYPE))}
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
                    </div>
                )}

                <div className={styles.filtre}>
                    <label id="typeOfVictory">Type de victoire</label>
                    <Select
                        MenuProps={SELECT_MENU_STYLE}
                        sx={SELECT_STYLE}
                        id="typeOfVictorySelect"
                        value={filters.typeOfVictory}
                        onChange={(e) => dispatch(setTypeOfVictory(e.target.value as TYPE_VICTORY))}
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

                <div className={styles.filtre}>
                    <label id="isRanked">Ranked ?</label>
                    <Select
                        MenuProps={SELECT_MENU_STYLE}
                        sx={SELECT_STYLE}
                        id="isRankedSelect"
                        value={filters.isRanked}
                        onChange={(e) => dispatch(setIsRanked(e.target.value === 'true' ? true : false))}
                        className={styles.select}
                    >
                        <MenuItem value={'true'} key={'oui'}>
                            Oui
                        </MenuItem>
                        <MenuItem value={'false'} key={'non'}>
                            Non
                        </MenuItem>
                    </Select>
                </div>
                
            </div>
        </div>
    )
}

export default GamesFilter