import { Button, Card, CardActions, CardContent, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { AuthUser } from '../../../store/reducers/authReducer';
import styles from './ProfilCard.module.scss';

type Props = {
    user: AuthUser
    count?: number
    partieType: 'standard' | 'special',
    handleOpen: () => void
}

const ProfilCard: React.FC<Props> = ({ user, count, partieType, handleOpen }) => {
    const ratioVictory = () => {
        return Math.round((user.victoires?.[partieType] / (user.partiesJouees?.[partieType] || 1)) * 100)
    }

    const colorVictory = () => {
        if (ratioVictory() >= 50) return 'green'
        else return 'red'
    }

    return (
        <>
            <Card className={styles.profil}>
                <CardContent>
                    <h2 className={styles.h2}>
                        {user?.prenom} {user?.nom?.charAt(0)}.
                    </h2>
    
                    <List style={{ padding: 0 }}>
                        <ListItem className={styles.list}>
                            <ListItemText
                                primary={`Nombre de decks = ${user.nbrDecks}`}
                            />
                            <ListItemText
                                primary={`Parties jouées = ${user.partiesJouees[partieType]} (${Math.round((user.partiesJouees[partieType]/(count || 1)) * 100)}%)`}
                            />
                            <ListItemText
                                primary={`Victoires = ${user.victoires[partieType]} (${ratioVictory()}%)`}
                                className={styles[colorVictory()]}
                            />
                        </ListItem>
                    </List>

                </CardContent>
                <CardActions style={{ padding: '8px 16px 16px' }}>
                    <Button size="small" onClick={handleOpen}>Modifier profil</Button>
                </CardActions>
            </Card> 
        </>
    )
}

export default ProfilCard