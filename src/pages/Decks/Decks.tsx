import { Button } from '@mui/material';
import { useState } from 'react';
import DecksModal from './DecksModal/DecksModal';
import DecksArray from './DecksArray/DecksArray';
import { Deck, useGetDecks } from '../../hooks/queries/decks/useGetDecks';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './Decks.module.scss';

const Decks = () => {
    const [open, setOpen] = useState(false);
    const {data: decks} = useGetDecks()
    const isStandard = useAppSelector((state) => state.type.isStandard);

    const partieType = isStandard ? 'standard' : 'special'
    const countVictories = decks?.reduce((sum, deck) => sum + deck.victoires?.[partieType], 0)
    const countGames = decks?.reduce((sum, deck) => sum + deck.parties?.[partieType], 0)
    
    const highestGamesPlayed = decks?.reduce((max, deck) => {
        return deck.parties?.[partieType] > max.parties?.[partieType] ? deck : max;
    });

    const highestRatio = () => {
        const highestDecksRatio = decks?.reduce((max, deck) => {
            const userRatio = Math.round((deck.victoires?.[partieType] / (deck.parties?.[partieType] || 1)) * 100);
            const maxRatio = Math.round((max.ratio || 0));
            
            if (userRatio > maxRatio) {
                return { ratio: userRatio, decks: [deck] };
            } else if (userRatio === maxRatio) {
                max.decks.push(deck);
            }
            return max;
        }, { ratio: 0, decks: [] as Array<Deck> });

        const highDeckVictory = highestDecksRatio?.decks?.reduce((max, deck) => {
            return deck.victoires?.[partieType] > max.victoires?.[partieType] ? deck : max;
        });

        return highDeckVictory
    }

    const moreVictory = decks?.reduce((max, deck) => {
        return deck.victoires?.[partieType] > max.victoires?.[partieType] ? deck : max;
    });

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>  
            <div className={styles.headerBloc}>
                <div>
                    <p className={styles.highlights}><img src={`/assets/seringue.png`} alt='seringue' width="30px" height="30px" style={{marginRight: '5px'}}/><strong style={{marginRight: '5px'}}>{highestGamesPlayed?.nom}</strong>{`(${Math.round(((highestGamesPlayed?.parties?.[partieType] || 0)/(countGames || 1)) * 100)}% parties jouées)`}</p>
                    <p className={styles.highlights}><img src={`/assets/couronne.png`} alt='couronne' width="35px" height="px" style={{marginRight: '7px'}}/><strong style={{marginRight: '5px'}}>{highestRatio()?.nom}</strong>{`(${Math.round(((highestRatio()?.victoires?.[partieType] || 0)/(highestRatio()?.parties?.[partieType]  || 1)) * 100)}% parties jouées gagnées)`}</p>
                    <p className={styles.highlights}><img src={`/assets/muscle.png`} alt='muscle' width="30px" height="30px" style={{marginRight: '10px'}}/><strong style={{marginRight: '5px'}}>{moreVictory?.nom}</strong>{`(${Math.round(((moreVictory?.victoires?.[partieType] || 0)/(countVictories || 1)) * 100)}% totalité des victoires)`}</p>
                </div>
                
                <div>
                    <Button variant="contained" onClick={handleOpen} className={styles.addDeck}>Ajouter un deck</Button>
                </div>
            </div>

            <DecksModal 
                open={open}
                setOpen={setOpen}
            />

            <DecksArray decks={decks} partieType={partieType} />
        </>
    )
}

export default Decks