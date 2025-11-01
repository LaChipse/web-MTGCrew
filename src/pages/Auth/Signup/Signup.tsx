import { CircularProgress, FormControl } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../../hooks/queries/useSignup';
import { LOGIN_PAGE } from '../../../router/routes';
import styles from './Signup.module.scss';
import classNames from 'classnames';

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
                    <input
                        required
                        value={nom}
                        id="nomSignup"
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Nom"
                    />
                </FormControl>
                <FormControl>
                    <input
                        required
                        value={prenom}
                        id="prenomSignup"
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Prénom"
                    />
                </FormControl>
                <FormControl>
                    <input
                        required
                        type='password'
                        value={password}
                        id="passwordSignup"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                </FormControl>

                <button disabled={!password || !prenom || !nom} style={{marginTop: '20px'}} className={classNames({[styles.disabled]: !password || !prenom || !nom})} onClick={handleSignUpForm}>
                    {isPending ? <CircularProgress style={{ width: '10px', height: '10px', color: 'var(--primary)' }}/> : 'Créer un compte'}
                </button>
                <button onClick={() => navigate(LOGIN_PAGE)}>Déjà un compte</button>
            </div>
        </div>
    )
}

export default Signup