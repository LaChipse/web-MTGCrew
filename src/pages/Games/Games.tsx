import { Button, Drawer } from '@mui/material';
import { useState } from 'react';
import DrawerStandardGamesForm from './DrawerGamesForm/Standard/DrawerStandardGamesForm';
import GamesArray from './GamesArray/GamesArray';
import { useCountGames } from '../../hooks/queries/games/useCountGames';
import { useAppSelector } from '../../hooks/useAppSelector';
import DrawerSpcialGamesForm from './DrawerGamesForm/Special/DrawerSpecialGamesForm';
import styles from './Games.module.scss';

const Games = () => {
    const isStandard = useAppSelector((state) => state.type.isStandard);

    const [openStandard, setOpenSdandard] = useState(false);
    const [openSpecial, setOpenSpecial] = useState(false);

    const { data: count } = useCountGames(isStandard)

    const toggleDrawer = (newOpen: boolean) => {
        if(isStandard) setOpenSdandard(newOpen) 
        else setOpenSpecial(newOpen);
    };

    return (
        <>
            <div className={styles.addGames}>
                <Button variant="contained" onClick={() => toggleDrawer(true)}>Ajouter une partie</Button>
                <strong>Parties jouées : {count}</strong>
            </div>

            <GamesArray isStandard={isStandard}/>

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