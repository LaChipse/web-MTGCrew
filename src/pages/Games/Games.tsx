import { Button, Drawer } from '@mui/material';
import { useState } from 'react';
import DrawerGamesForm from './DrawerGamesForm/DrawerGamesForm';
import GamesArray from './GamesArray/GamesArray';
import { useCountGames } from '../../hooks/queries/games/useCountGames';
import styles from './Games.module.scss';

const Games = () => {
    const [open, setOpen] = useState(false);
    const { data: count } = useCountGames()

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <>
            <div className={styles.addGames}>
                <Button variant="contained" onClick={() => toggleDrawer(true)}>Ajouter une partie</Button>
                <strong>Nbr de parties : {count}</strong>
            </div>

            <GamesArray />

            <Drawer open={open} onClose={() => toggleDrawer(false)} anchor='right' className={styles.drawer}>
                <DrawerGamesForm toggleDrawer={toggleDrawer}/>
            </Drawer>
        </>
    )
}

export default Games