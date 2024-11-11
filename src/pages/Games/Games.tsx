import { Button, Drawer } from '@mui/material';
import { useState } from 'react';
import DrawerGamesForm from './DrawerGamesForm/DrawerGamesForm';
import GamesArray from './GamesArray/GamesArray';
import styles from './Games.module.scss';

const Games = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <div>
                <Button variant="contained" onClick={toggleDrawer(true)}  className={styles.addGames}>Ajouter une partie</Button>
            </div>

            <GamesArray />

            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right' className={styles.drawer}>
                <DrawerGamesForm toggleDrawer={toggleDrawer}/>
            </Drawer>
        </>
    )
}

export default Games