import { Button } from '@mui/material';
import { useState } from 'react';
import DecksModal from './DecksModal/DecksModal';
import DecksArray from './DecksArray/DecksArray';
import { useGetDecks } from '../../hooks/queries/decks/useGetDecks';
import styles from './Decks.module.scss';

const Decks = () => {
    const [open, setOpen] = useState(false);
    const { data: decks, isLoading} = useGetDecks()

    const countVictories = decks?.reduce((sum, deck) => sum + deck.victoires, 0)
    const countGames = decks?.reduce((sum, deck) => sum + deck.parties, 0)
    
    const highestGamesPlayed = decks?.reduce((max, deck) => {
        return deck.parties > max.parties ? deck : max;
    });
    
    const highestRatio = decks?.reduce((max, deck) => {
        return Math.round((deck.victoires/(deck.parties  || 1)) * 100) > Math.round((max.victoires/(max.parties  || 1)) * 100) ? deck : max;
    });

    const moreVictory = decks?.reduce((max, deck) => {
        return deck.victoires > max.victoires ? deck : max;
    });

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>  
            <div className={styles.headerBloc}>
                <div>
                    <p className={styles.highlights}><img src={`/assets/seringue.png`} alt='seringue' width="35px" height="35px" style={{marginRight: '5px'}}/><strong style={{marginRight: '5px'}}>{highestGamesPlayed?.nom}</strong>{`(${Math.round(((highestGamesPlayed?.parties || 0)/(countGames  || 1)) * 100)}% parties jouées)`}</p>
                    <p className={styles.highlights}><img src={`/assets/couronne.png`} alt='couronne' width="40px" height="30px" style={{marginRight: '7px'}}/><strong style={{marginRight: '5px'}}>{highestRatio?.nom}</strong>{`(${Math.round(((highestGamesPlayed?.victoires || 0)/(highestGamesPlayed?.parties  || 1)) * 100)}% parties jouées gagnées)`}</p>
                    <p className={styles.highlights}><img src={`/assets/muscle.png`} alt='seringue' width="35px" height="35px" style={{marginRight: '5px'}}/><strong style={{marginRight: '5px'}}>{moreVictory?.nom}</strong>{`(${Math.round(((moreVictory?.victoires || 0)/(countVictories  || 1)) * 100)}% totalité des victoires)`}</p>
                </div>
                
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