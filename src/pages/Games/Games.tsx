import { Drawer } from '@mui/material';
import 'dayjs/locale/fr';
import { useEffect, useState } from 'react';
import { useCountGames } from '../../hooks/queries/games/useCountGames';
import { useGetGames } from '../../hooks/queries/games/useGetGames';
import { useAppSelector } from '../../hooks/useAppSelector';
import Header from '../../Layouts/Theme/components/Header/Header';
import SmallLoading from '../loader/SmallLoading/SmallLoading';
import DrawerPartie from './DrawerGame/DrawerGame';
import GamesFilter from './GamesFilter/GamesFilter';
import GamesArray from './GamesArray/GamesArray';
import { DRAWER_STYLE } from '../../Layouts/Theme/StyleMui';
import styles from './Games.module.scss';

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
            <Header />

            <div>
                <div className={styles.addGames}>
                    <strong>Nombre de parties : {count}</strong>
                    <button className={styles.add} onClick={() => toggleDrawer(true)}>+</button>
                </div>
            </div>

            <GamesFilter />

            <div style={{marginTop: '20px'}}>
                { isGamesLoading ? (
                    <SmallLoading heightContainer='50vh' dimensionLoader='150px' borderWidth='10px' />
                ) : (
                    <GamesArray page={page} games={games} count={count} setPage={setPage} divider={20} />
                )}
            </div>

            <Drawer 
                sx={DRAWER_STYLE} 
                open={isStandard ? openStandard : openSpecial} 
                onClose={() => toggleDrawer(false)} 
                anchor='right'
            >
                <DrawerPartie toggleDrawer={toggleDrawer}/>
            </Drawer>
        </>
    )
}

export default Games