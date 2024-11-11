import { useState } from 'react'
import { useSignup } from '../../../hooks/queries/useSignup';
import { Button, FormControl, TextField } from '@mui/material';
import styles from './Signup.module.scss';

const Signup = () => {
    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');

    const { mutate } = useSignup();

    const handleSignUpForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Empêche le rechargement de la page
        mutate({ nom, prenom, password });
    };

    return (
        <div className={styles.body}>
            <h1>MTG CREW</h1>
                <FormControl className={styles.form}>
                    <TextField
                        required
                        label="Nom"
                        value={nom}
                        id="nomSignup"
                        size="small"
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Nom"
                    />

                    <TextField
                        required
                        label="Prénom"
                        value={prenom}
                        id="prenomSignup"
                        size="small"
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Prénom"
                    />

                    <TextField
                        required
                        label="Mot de passe"
                        type='password'
                        value={password}
                        id="passwordSignup"
                        size="small"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />

                    <Button href={""} type="submit" variant="contained" onClick={handleSignUpForm} className={styles.submit}>Créer un compte</Button>
                </FormControl>
            </div>
    )
}

export default Signup