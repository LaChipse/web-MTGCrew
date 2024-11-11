import React from 'react';
import { Button, Card, CardActions, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { AuthUser } from '../../../store/reducers/authReducer';
import styles from './ProfilCard.module.scss'
import { useCountGames } from '../../../hooks/queries/useCountGames';

type Props = {
    user: AuthUser
    handleOpen: () => void
}

const ProfilCard: React.FC<Props> = ({ user, handleOpen }) => {
    const { data: count } = useCountGames()

    return (
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
                            primary={`Parties jouées = ${user.partiesJouees} (${Math.round((user.partiesJouees/count!) * 100)}%)`}
                        />
                        <ListItemText
                            primary={`Victoires = ${user.victoires} (${Math.round((user.victoires/user.partiesJouees) * 100)}%)`}
                        />
                    </ListItem>
                </List>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleOpen}>Modifier profil</Button>
            </CardActions>
        </Card>
    )
}

export default ProfilCard