import { Button } from '@mui/material';
import { useState } from 'react';
import DecksArray from './DecksArray/DecksArray';
import { Deck, useGetDecks } from '../../hooks/queries/decks/useGetDecks';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './Decks.module.scss';
import DecksActionModal from './DecksActionModal/DecksActionModal';
import SmallLoading from '../loader/SmallLoading/SmallLoading';

const Decks = () => {
    const [open, setOpen] = useState(false);
    const { data: decks, isLoading: isDecksLoading } = useGetDecks()
    const isStandard = useAppSelector((state) => state.type.isStandard);

    const partieType = isStandard ? 'standard' : 'special'
    const countVictories = decks ? decks.reduce((sum, deck) => sum + deck.victoires?.[partieType], 0) : 0
    const countGames = decks ? decks.reduce((sum, deck) => sum + deck.parties?.[partieType], 0) : 0
    
    const highestGamesPlayed = decks?.length ? decks.reduce((max, deck) => {
        return deck.parties?.[partieType] > max.parties?.[partieType] ? deck : max;
    }) : undefined;

    const highestRatio = () => {
        if(decks?.length) {
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

        return undefined
    }

    const moreVictory = decks?.length ? decks.reduce((max, deck) => {
        return deck.victoires?.[partieType] > max.victoires?.[partieType] ? deck : max;
    }) : undefined;

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>  
            <div className={styles.headerBloc}>
                <div>
                    <p className={styles.highlights}><img src={`/assets/seringue.png`} alt='seringue' width="30px" height="30px" style={{marginRight: '5px'}}/><strong style={{marginRight: '5px'}}>{highestGamesPlayed ? highestGamesPlayed.nom : 'Non définie'}</strong>{highestGamesPlayed ? `(${Math.round(((highestGamesPlayed?.parties?.[partieType] || 0)/(countGames || 1)) * 100)}% parties jouées)` : 'Non défini'}</p>
                    <p className={styles.highlights}><img src={`/assets/couronne.png`} alt='couronne' width="35px" height="px" style={{marginRight: '7px'}}/><strong style={{marginRight: '5px'}}>{decks?.length ? highestRatio()?.nom : 'Non définie'}</strong>{`(${Math.round(((highestRatio()?.victoires?.[partieType] || 0)/(highestRatio()?.parties?.[partieType]  || 1)) * 100)}% parties jouées gagnées)`}</p>
                    <p className={styles.highlights}><img src={`/assets/muscle.png`} alt='muscle' width="30px" height="30px" style={{marginRight: '10px'}}/><strong style={{marginRight: '5px'}}>{moreVictory ? moreVictory?.nom : 'Non définie'}</strong>{moreVictory ? `(${Math.round(((moreVictory?.victoires?.[partieType] || 0)/(countVictories || 1)) * 100)}% totalité des victoires)` : 'Non défini'}</p>
                </div>
                
                <div>
                    <Button variant="contained" onClick={handleOpen} className={styles.addDeck}>Ajouter un deck</Button>
                </div>
            </div>

            <DecksActionModal 
                open={open}
                setOpen={setOpen}
            />

            { isDecksLoading ? (
                <SmallLoading />
            ) : (
                <DecksArray decks={decks} partieType={partieType} />
            )}
        </>
    )
}

export default Decks