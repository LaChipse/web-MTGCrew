import { Button } from '@mui/material';
import { useState } from 'react';
import DecksModal from './DecksModal/DecksModal';
import DecksArray from './DecksArray/DecksArray';
import { useGetDecks } from '../../hooks/queries/decks/useGetDecks';
import styles from './Decks.module.scss';

const Decks = () => {
    const [open, setOpen] = useState(false);
    const { data: decks, isLoading} = useGetDecks()

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

            <DecksArray decks={decks} isLoading={isLoading}/>
        </>
    )
}

export default Decks