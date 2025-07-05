import 'dayjs/locale/fr';
import dayjs, { Dayjs } from 'dayjs';
import { Button, Drawer } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useGetGames } from '../../hooks/queries/games/useGetGames';
import { useCountGames } from '../../hooks/queries/games/useCountGames';
import GamesArray from '../../Layouts/Theme/components/GamesArray/GamesArray';
import DrawerSpcialGamesForm from './DrawerGamesForm/Special/DrawerSpecialGamesForm';
import DrawerStandardGamesForm from './DrawerGamesForm/Standard/DrawerStandardGamesForm';

import styles from './Games.module.scss';

const Games = () => {
    dayjs.locale('fr')
    
    const [page, setPage] = useState(1)
    const [openStandard, setOpenSdandard] = useState(false);
    const [openSpecial, setOpenSpecial] = useState(false);
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)

    const isStandard = useAppSelector((state) => state.type.isStandard);

    const { data: games, refetch: refetchGames } = useGetGames(isStandard, page, { startDate, endDate })
    const { data: count, refetch: refetchCount } = useCountGames(isStandard, { startDate, endDate })

    useEffect(() => {
        const bothDefined = !!startDate && !!endDate;
        const bothUndefined = !startDate && !endDate;

        if (bothDefined || bothUndefined) {
            refetchGames();
            refetchCount();
        }
    }, [endDate, startDate, refetchGames, refetchCount])

    const toggleDrawer = (newOpen: boolean) => {
        if(isStandard) setOpenSdandard(newOpen) 
        else setOpenSpecial(newOpen);
    };

    return (
        <>
        <div>
            <div className={styles.addGames}>
                <Button variant="contained" onClick={() => toggleDrawer(true)}>Ajouter une partie</Button>
                <strong>Parties jouées : {count}</strong>
            </div>
            <div className={styles.datePickers}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                    <div>
                        <p>Debut</p>
                        <DatePicker 
                            className={styles.datePicker} 
                            value={startDate} 
                            onChange={(d) => setStartDate(d!.startOf('day').add(1, 'second'))}
                            shouldDisableDate={(date) => date.isAfter(endDate)}
                        />
                    </div>
                    <div>
                        <p>Fin</p>
                        <DatePicker 
                            className={styles.datePicker} 
                            value={endDate} 
                            onChange={(d) => setEndDate(d!.endOf('day'))} 
                            shouldDisableDate={(date) => date.isBefore(startDate)}
                        />
                    </div>
                </LocalizationProvider>
            </div>
        </div>

            <GamesArray games={games} count={count} setPage={setPage} divider={20} />

            <Drawer open={openStandard} onClose={() => toggleDrawer(false)} anchor='right' className={styles.drawer}>
                <DrawerStandardGamesForm toggleDrawer={toggleDrawer} />
            </Drawer>

            <Drawer open={openSpecial} onClose={() => toggleDrawer(false)} anchor='right' className={styles.drawer}>
                <DrawerSpcialGamesForm toggleDrawer={toggleDrawer} />
            </Drawer>
        </>
    )
}

export default Games