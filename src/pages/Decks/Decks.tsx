import { Button } from '@mui/material';
import { useState } from 'react';
import DecksModal from './DecksModal/DecksModal';
import styles from './Decks.module.scss';
import DecksArray from './DecksArray/DecksArray';

const Decks = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>  
            <div>
                <Button variant="contained" onClick={handleOpen}  className={styles.addDeck}>Ajouter un deck</Button>
            </div>

            <DecksModal 
                open={open}
                setOpen={setOpen}
            />

            <DecksArray />
        </>
    )
}

export default Decks