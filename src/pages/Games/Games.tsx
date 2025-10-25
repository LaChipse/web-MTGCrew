import { Button, Drawer } from '@mui/material';
import 'dayjs/locale/fr';

import { useEffect, useState } from 'react';

import { useCountGames } from '../../hooks/queries/games/useCountGames';
import { useGetGames } from '../../hooks/queries/games/useGetGames';
import { useAppSelector } from '../../hooks/useAppSelector';
import GamesArray from '../../Layouts/Theme/components/GamesArray/GamesArray';
import DrawerSpcialGamesForm from './DrawerGamesForm/Special/DrawerSpecialGamesForm';
import DrawerStandardGamesForm from './DrawerGamesForm/Standard/DrawerStandardGamesForm';

import styles from './Games.module.scss';
import SmallLoading from '../loader/SmallLoading/SmallLoading';

const Games = () => {
    const [page, setPage] = useState(1)
    const [openStandard, setOpenSdandard] = useState(false);
    const [openSpecial, setOpenSpecial] = useState(false);

    const isStandard = useAppSelector((state) => state.type.isStandard);
    const filters = useAppSelector((state) => state.gameFilters);

    const { data: games, refetch: refetchGames, isLoading: isGamesLoading } = useGetGames(isStandard, page, filters)
    const { data: count, refetch: refetchCount } = useCountGames(isStandard, filters)

    useEffect(() => {
        refetchGames();
        refetchCount();
    }, [filters, refetchGames, refetchCount])

    const toggleDrawer = (newOpen: boolean) => {
        if(isStandard) setOpenSdandard(newOpen) 
        else setOpenSpecial(newOpen);
    };

    return (
        <>
        <div>
            <div className={styles.addGames}>
                <Button variant="contained" onClick={() => toggleDrawer(true)}>Ajouter une partie</Button>
                <strong>Nombre de parties : {count}</strong>
            </div>
        </div>

            { isGamesLoading ? (
                <SmallLoading />
            ) : (
                <GamesArray page={page} games={games} count={count} setPage={setPage} divider={20} />
            )}

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