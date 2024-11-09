import { Button, FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import { useLogin } from '../../../hooks/queries/useLogin';
import styles from './Login.module.scss';

const Login = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');

    const { mutate } = useLogin();

    const handleSubmit = (e) => {
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
                    id="outlined-size-small"
                    size="small"
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Nom"
                />

<               TextField
                    required
                    label="Prenom"
                    value={prenom}
                    id="outlined-size-small"
                    size="small"
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Prenom"
                />

                <TextField
                    required
                    label="Mot de passe"
                    type='password'
                    value={password}
                    id="outlined-size-small"
                    size="small"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                />

                <Button type="submit" variant="contained" onClick={handleSubmit} className={styles.submit}>Se connecter</Button>
                <Button href={'http://localhost:3000/signup'}>Créer un compte</Button>
            </FormControl>

            
        </div>
    )
}

export default Login