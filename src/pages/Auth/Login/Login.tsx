import { Button, FormControl, TextField } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { SIGNUP_PAGE } from '../../../router/routes';
import { useLogin } from '../../../hooks/queries/useLogin';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const Login = () => {
    const navigate = useNavigate()
    
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');

    const { mutate, isPending } = useLogin();

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate({ nom, prenom, password });
    };

    return (
        <div className={styles.body}>
            <h1>MTG CREW</h1>
            <div className={styles.form}>
                <FormControl>
                    <TextField
                        required
                        label="Nom"
                        value={nom}
                        id="nom"
                        size="small"
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Nom"
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        required
                        label="Prenom"
                        value={prenom}
                        id="prenom"
                        size="small"
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Prenom"
                    />
                </FormControl>
                <FormControl>
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
                </FormControl>
                
                <LoadingButton disabled={isPending} loading={isPending} variant="contained" onClick={handleSubmit} className={styles.submit}>
                    Se connecter
                </LoadingButton>
                <Button onClick={() => navigate(SIGNUP_PAGE)}>Créer un compte</Button>
            </div>
        </div>
    )
}

export default Login