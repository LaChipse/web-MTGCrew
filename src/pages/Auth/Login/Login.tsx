import { Button, FormControl, TextField } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { SIGNUP_PAGE } from '../../../router/routes';
import { useLogin } from '../../../hooks/queries/useLogin';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');

    const { mutate } = useLogin();

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
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
                    id="nom"
                    size="small"
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Nom"
                />

<               TextField
                    required
                    label="Prenom"
                    value={prenom}
                    id="prenom"
                    size="small"
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Prenom"
                />

                <TextField
                    required
                    label="Mot de passe"
                    type='password'
                    value={password}
                    id="password"
                    size="small"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                />

                <Button type="submit" variant="contained" onClick={handleSubmit} className={styles.submit}>Se connecter</Button>
                <Button onClick={() => navigate(SIGNUP_PAGE)}>Créer un compte</Button>
            </FormControl>

            
        </div>
    )
}

export default Login