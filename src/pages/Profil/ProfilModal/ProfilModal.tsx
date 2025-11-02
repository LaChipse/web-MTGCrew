import { CircularProgress, FormControl, Modal } from '@mui/material';
import classNames from 'classnames';
import React, { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateUser } from '../../../hooks/queries/joueurs/useUpdateUser';
import { AuthUser } from '../../../store/reducers/authReducer';
import { setTheme } from '../../../store/reducers/themeReducer';
import styles from './ProfilModal.module.scss';
import { useAppSelector } from '../../../hooks/useAppSelector';

type Props = {
    user: AuthUser
    open: boolean
    setOpen: (value: React.SetStateAction<boolean>) => void
}

const COLORS = ['#FFFFFF', '#F1FE00', '#ffa51dff', '#fa3d3dff', '#ff97f5ff', '#27E9FF', '#57f36fff'  ]

const ProfilModal: React.FC<Props> = ({ user, open, setOpen }) => {
    const [nom, setNom] = useState(user.nom);
    const [prenom, setPrenom] = useState(user.prenom);
    const [password, setPassword] = useState('');
    const [colorStd, setColorStd] = useState(user.colorStd)
    const [colorSpec, setColorSpec] = useState(user.colorSpec)

    const dispatch = useDispatch();
    const theme = useAppSelector((state) => state.theme)

    const { mutate, isPending } = useUpdateUser();

    const handleUpdateUser = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Empêche le rechargement de la page
        mutate({ nom, prenom, colorStd, colorSpec, password });
        setPassword('')
        setOpen(false)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeTheme = (mode: 'std' | 'spec', color: string) => {
        if (mode === 'std') setColorStd(color);
        if (mode === 'spec') setColorSpec(color);

        dispatch(setTheme({[mode === 'std' ? 'primaryStd' : 'primarySpec']: color}))
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="updateUser"
            aria-describedby="mise à jour profil"
            style={{ backdropFilter: 'blur(3px)'}}
        >
            <div className={styles.modal}>
                <h2 id="updateUser">Modifier son profil</h2>
                <FormControl className={styles.form}>
                    <div className={styles.groupForm}>
                        <label>Nom</label>
                        <input
                            required
                            type='text'
                            value={nom}
                            id="nomProfil"
                            onChange={(e) => setNom(e.target.value)}
                            placeholder="Nom"
                        />
                    </div>
                    
                    <div className={styles.groupForm}>
                        <label>Prénom</label>
                        <input
                            required
                            type='text'
                            value={prenom}
                            id="prenomProfil"
                            onChange={(e) => setPrenom(e.target.value)}
                            placeholder="Prénom"
                        />
                    </div>

                    <div className={styles.groupForm}>
                        <label>Mot de passe</label>
                        <input
                            type='password'
                            value={password}
                            id="passwordProfil"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mot de passe"
                        />
                    </div>

                    <div className={styles.secondBloc}>
                        <p style={{ color: 'var(--white)', fontSize: '14px' }}>Standard : {COLORS.map((color) => (
                            <button key={color} style={{backgroundColor: color}} className={classNames(styles.radioColor, {[styles.isActive]: color === theme.primaryStd})} onClick={() => handleChangeTheme('std', color)} />
                        ))}</p>
                        <p style={{ color: 'var(--white)', fontSize: '14px' }}>Spécial : {COLORS.map((color) => (
                            <button key={color} style={{backgroundColor: color}} className={classNames(styles.radioColor, {[styles.isActive]: color === theme.primarySpec})} onClick={() => handleChangeTheme('spec', color)} />
                        ))}</p> 
                    </div>

                    <button 
                        disabled={isPending} 
                        type="submit" 
                        onClick={handleUpdateUser}
                        className={styles.updateButton}
                    >
                        {isPending ? <CircularProgress style={{ width: '10px', height: '10px', color: 'var(--primary)' }}/> : 'Modifier'}
                    </button>
                </FormControl>
            </div>
        </Modal>
    )
}

export default ProfilModal