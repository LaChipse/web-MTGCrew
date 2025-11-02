import React from 'react';
import { Deck, useGetDecks } from '../../../hooks/queries/decks/useGetDecks';
import { useCountGames } from '../../../hooks/queries/games/useCountGames';
import { AuthUser } from '../../../store/reducers/authReducer';
import styles from './ProfilCard.module.scss';

type Props = {
    user: AuthUser
    isStandard: boolean
    partieType: 'standard' | 'special',
    handleImageChoose: React.Dispatch<React.SetStateAction<Deck | undefined>>
    handleOpen: () => void
}

const ProfilCard: React.FC<Props> = ({ user, isStandard, partieType, handleImageChoose, handleOpen }) => {
    const { data: count } = useCountGames(isStandard, { startDate: null, endDate: null })
    const { data: decks } = useGetDecks();

    const ratioVictory = () => {
        return Math.round((user.victoires?.[partieType] / (user.partiesJouees?.[partieType] || 1)) * 100)
    }

    const colorVictory = () => {
        if (ratioVictory() >= 30) return 'green'
        else return 'red'
    }

    const chooseRandomImg = () => {
        const randomIndex = Math.floor(Math.random() * decks!.length);
        handleImageChoose({...decks![randomIndex]})
    }

    return (
        <div className={styles.profil}>
                <div className={styles.summary}>
                    <h2>
                        {user?.prenom} {user?.nom?.charAt(0)}.
                    </h2>
                    <ul>
                        <li className={styles.liste}>{`Nombre de decks = ${user.nbrDecks}`}</li>
                        <li className={styles.liste}>{`Nombre de parties = ${user.partiesJouees[partieType]} (${Math.round((user.partiesJouees[partieType]/(count || 1)) * 100)}%)`}</li>
                        <li className={styles[colorVictory()]}>{`Victoires = ${user.victoires[partieType]} (${ratioVictory()}%)`}</li>
                    </ul>
                </div>

                <div className={styles.action}>
                    <button onClick={handleOpen} className={styles.updateButton} />
                    {decks && (

                        <button onClick={chooseRandomImg} className={styles.chooseRandomCard}>
                            ?
                        </button>
                    )}
                </div>
        </div> 
    )
}

export default ProfilCard