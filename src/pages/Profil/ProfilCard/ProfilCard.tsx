import React from 'react';
import { Button, Card, CardActions, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { AuthUser } from '../../../store/reducers/authReducer';
import styles from './ProfilCard.module.scss'

type Props = {
    user: AuthUser
    handleOpen: () => void
}

const ProfilCard: React.FC<Props> = ({ user, handleOpen }) => (
    <Card className={styles.profil}>
        <CardContent>
            <h2 className={styles.h2}>
                {user?.prenom} {user.nom.charAt(0)}.
            </h2>

            <List>
                <ListItem className={styles.list}>
                    <ListItemText
                        primary={`Decks = ${user.nbrDecks}`}
                    />
                    <ListItemText
                        primary={`Deck plus joué = deck`}
                    />
                    <ListItemText
                        primary={`Meilleur deck = deck`}
                    />
                    <ListItemText
                        primary={`Parties jouées = ${user.partiesJouees}`}
                    />
                    <ListItemText
                        primary={`Victoires = ${user.victoires}`}
                    />
                </ListItem>
            </List>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={handleOpen}>Modifier profil</Button>
        </CardActions>
    </Card>
)

export default ProfilCard