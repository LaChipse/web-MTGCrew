import { useState } from 'react';
import Biceps from '../../components/Biceps';
import Crown from '../../components/Crown';
import Seringue from '../../components/Syringe';
import { Deck, useGetDecks } from '../../hooks/queries/decks/useGetDecks';
import { useAppSelector } from '../../hooks/useAppSelector';
import SmallLoading from '../loader/SmallLoading/SmallLoading';
import DecksActionModal from './DecksActionModal/DecksActionModal';
import DecksArray from './DecksArray/DecksArray';
import Header from '../../Layouts/Theme/components/Header/Header';
import styles from './Decks.module.scss';

const Decks = () => {
    const [open, setOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 1 | -1 }>({ key: 'nom', direction: 1 });

    const { data: decks, isLoading: isDecksLoading } = useGetDecks(sortConfig)
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
            <Header />

            <div className={styles.headerBloc}>
                <div>
                    <p className={styles.highlights}><Seringue height='1.5em' width='1.5em' /><strong style={{marginRight: '5px'}}>{highestGamesPlayed ? highestGamesPlayed.nom : 'Non définie'}</strong>{highestGamesPlayed ? `(${Math.round(((highestGamesPlayed?.parties?.[partieType] || 0)/(countGames || 1)) * 100)}% parties jouées)` : 'Non défini'}</p>
                    <p className={styles.highlights}><Crown height='1.5em' width='1.5em' /><strong style={{marginRight: '5px'}}>{decks?.length ? highestRatio()?.nom : 'Non définie'}</strong>{`(${Math.round(((highestRatio()?.victoires?.[partieType] || 0)/(highestRatio()?.parties?.[partieType]  || 1)) * 100)}% parties jouées gagnées)`}</p>
                    <p className={styles.highlights}><Biceps height='1.5em' width='1.5em' /><strong style={{marginRight: '5px'}}>{moreVictory ? moreVictory?.nom : 'Non définie'}</strong>{moreVictory ? `(${Math.round(((moreVictory?.victoires?.[partieType] || 0)/(countVictories || 1)) * 100)}% totalité des victoires)` : 'Non défini'}</p>
                </div>
                
                <div>
                    <button className={styles.add} onClick={handleOpen}>+</button>
                </div>
            </div>

            <DecksActionModal 
                open={open}
                setOpen={setOpen}
            />

            { isDecksLoading ? (
                <SmallLoading heightContainer='70%' dimensionLoader='150px' borderWidth='10px'/>
            ) : (
                <DecksArray decks={decks} partieType={partieType} sortConfig={sortConfig} handleSetSortConfig={setSortConfig}/>
            )}
        </>
    )
}

export default Decks