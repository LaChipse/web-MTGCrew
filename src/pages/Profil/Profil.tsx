import 'dayjs/locale/fr';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { useEffect, useState } from 'react';

import Loading from '../Loading/Loading';
import ProfilCard from './ProfilCard/ProfilCard';
import ProfilModal from './ProfilModal/ProfilModal';
import { useAppSelector } from '../../hooks/useAppSelector';
import GamesArray from '../../Layouts/Theme/components/GamesArray/GamesArray';
import { useGetHistoryGames } from '../../hooks/queries/games/useGetHistoryGames';
import { useCountHistoryGames } from '../../hooks/queries/games/useCountHistoryGames';

import styles from './Profil.module.scss';

const Profil = () => {
    dayjs.locale('fr')

    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)

    const user = useAppSelector((state) => state.auth.user);
    const isStandard = useAppSelector((state) => state.type.isStandard);
    const partieType = isStandard ? 'standard' : 'special'

    const { data: gameHistory, refetch: refetchHistoryGames } = useGetHistoryGames(isStandard, page, { startDate, endDate })
    const { data: count, refetch: refetchCountHistory } = useCountHistoryGames(isStandard, { startDate, endDate })

    useEffect(() => {
        const bothDefined = !!startDate && !!endDate;
        const bothUndefined = !startDate && !endDate;

        if (bothDefined || bothUndefined) {
            refetchHistoryGames();
            refetchCountHistory();
        }
    }, [endDate, startDate, refetchHistoryGames, refetchCountHistory])

    const handleOpen = () => {
        setOpen(true);
    };

    if (!user) return <Loading />;

    return (
        <>
            {user && (
                <>
                    <ProfilCard 
                        user={user}
                        isStandard={isStandard}
                        handleOpen={handleOpen}
                        partieType={partieType}
                    />

                    <ProfilModal 
                        user={user}
                        open={open}
                        setOpen={setOpen}
                    />
                </>
            )}

            <div className={styles.datePickers}>
                <div>
                    <p>Debut</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                        <DatePicker 
                            className={styles.datePicker} 
                            value={startDate} 
                            onChange={(d) => setStartDate(d!.startOf('day').add(1, 'second'))}
                            shouldDisableDate={(date) => date.isAfter(endDate)}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <p>Fin</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                        <DatePicker 
                            className={styles.datePicker} 
                            value={endDate} 
                            onChange={(d) => setEndDate(d!.endOf('day'))} 
                            shouldDisableDate={(date) => date.isBefore(startDate)}
                        />
                    </LocalizationProvider>
                </div>
            </div>

            <div className={styles.history}>
                <h2 style={{color: 'rgb(197, 195, 195)', marginBottom: 15}}>Dernières parties jouées :</h2>
                <GamesArray games={gameHistory} divider={10} setPage={setPage} count={count} isHystoric />
            </div>
        </>
    )
}

export default Profil