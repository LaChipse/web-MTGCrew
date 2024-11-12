import React from 'react';
import { Button, Card, CardActions, CardContent, List, ListItem, ListItemText, Skeleton } from '@mui/material';
import { AuthUser } from '../../../store/reducers/authReducer';
import { useCountGames } from '../../../hooks/queries/games/useCountGames';
import styles from './ProfilCard.module.scss'

type Props = {
    user: AuthUser
    handleOpen: () => void
}

const ProfilCard: React.FC<Props> = ({ user, handleOpen }) => {
    const { data: count } = useCountGames()

    const ratioVictory = () => {
        return Math.round((user.victoires/(user.partiesJouees || 1)) * 100)
    }

    const colorVictory = () => {
        if (ratioVictory() >= 50) return 'green'
        else return 'red'
    }

    return (
        <>
            {
                user ? (
                    <Card className={styles.profil}>
                    <CardContent>
                        <h2 className={styles.h2}>
                            {user?.prenom} {user.nom.charAt(0)}.
                        </h2>
        
                        <List>
                            <ListItem className={styles.list}>
                                <ListItemText
                                    primary={`Nombre de decks = ${user.nbrDecks}`}
                                />
                                <ListItemText
                                    primary={`Parties jouées = ${user.partiesJouees} (${Math.round((user.partiesJouees/(count || 1)) * 100)}%)`}
                                />
                                <ListItemText
                                    primary={`Victoires = ${user.victoires} (${ratioVictory()}%)`}
                                    className={styles[colorVictory()]}
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={handleOpen}>Modifier profil</Button>
                    </CardActions>
                </Card>
                ) : ( <Skeleton variant="rectangular" width={400} height={150} /> )
            }
        </>
    )
}

export default ProfilCard