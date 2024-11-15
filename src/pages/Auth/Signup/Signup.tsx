import { MouseEvent, useState } from 'react'
import { useSignup } from '../../../hooks/queries/useSignup';
import { Button, FormControl, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE } from '../../../router/routes';
import styles from './Signup.module.scss';
import { LoadingButton } from '@mui/lab';

const Signup = () => {
    const navigate = useNavigate()

    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');

    const { mutate, isPending } = useSignup();

    const handleSignUpForm = (e: MouseEvent<HTMLButtonElement>) => {
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
                        value={nom}
                        id="nomSignup"
                        size="small"
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Nom"
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        required
                        value={prenom}
                        id="prenomSignup"
                        size="small"
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Prénom"
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        required
                        type='password'
                        value={password}
                        id="passwordSignup"
                        size="small"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                </FormControl>

                <LoadingButton disabled={ !nom || !prenom || !password } loading={isPending} variant="contained" onClick={handleSignUpForm} className={styles.submit}>
                    Créer un compte
                </LoadingButton>
                <Button onClick={() => navigate(LOGIN_PAGE)}>Se connecter</Button>
            </div>
        </div>
    )
}

export default Signup