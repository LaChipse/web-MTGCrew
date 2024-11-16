import { FormControl, TextField } from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
// import { SIGNUP_PAGE } from '../../../router/routes';
import { useLogin } from '../../../hooks/queries/useLogin';
// import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '../../../hooks/useAppSelector';
import styles from './Login.module.scss';

const Login = () => {
    // const navigate = useNavigate()
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
                    <TextField
                        required
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
                        type='password'
                        value={password}
                        id="password"
                        size="small"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                </FormControl>
                
                <LoadingButton loading={isPending} variant="contained" onClick={handleSubmit} className={styles.submit}>
                    Se connecter
                </LoadingButton>
                {/* <Button onClick={() => navigate(SIGNUP_PAGE)}>Créer un compte</Button> */}
            </div>
        </div>
    )
}

export default Login