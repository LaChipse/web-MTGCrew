import { CircularProgress, FormControl } from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../../hooks/queries/useLogin';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { SIGNUP_PAGE } from '../../../router/routes';
import styles from './Login.module.scss';
import classNames from 'classnames';

const Login = () => {
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.auth.user);

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');

    const { mutate, isPending } = useLogin();

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate({ nom, prenom, password });
    };

    useEffect(() => {
        if(user) {
            setNom(user.nom)
            setPrenom(user.prenom)
        }
    }, [user])

    return (
        <div className={styles.body}>
            <h1>MTG CREW</h1>
            <div className={styles.form}>
                <FormControl>
                    <input
                        required
                        type='text'
                        value={nom}
                        id="nomProfil"
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Nom"
                    />
                </FormControl>
                <FormControl>
                    <input
                        required
                        type='text'
                        value={prenom}
                        id="prenomProfil"
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Prénom"
                    />
                </FormControl>
                <FormControl>
                    <input
                        type='password'
                        value={password}
                        id="passwordProfil"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                </FormControl>
                
                <button disabled={!password || !prenom || !nom} className={classNames({[styles.disabled]: !password || !prenom || !nom})} style={{marginTop: '20px'}} onClick={handleSubmit} >
                    {isPending ? <CircularProgress style={{ width: '10px', height: '10px', color: 'var(--primary)' }}/> : 'Se connecter'}
                </button>
                <button onClick={() => navigate(SIGNUP_PAGE)}>
                    Créer un compte
                </button>
            </div>
        </div>
    )
}

export default Login