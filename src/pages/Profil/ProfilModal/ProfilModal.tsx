import React, { useState } from 'react';
import { Button, FormControl, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useUpdateUser } from '../../../hooks/queries/useUpdateUser';
import { authActions, AuthUser } from '../../../store/reducers/authReducer';
import { addSuccessSnackbar } from '../../../store/reducers/snackbarReducer';
import styles from './ProfilModal.module.scss';

type Props = {
    user: AuthUser
    open: boolean
    setOpen: (value: React.SetStateAction<boolean>) => void
}

const ProfilModal: React.FC<Props> = ({ user, open, setOpen }) => {
    const dispatch = useAppDispatch();
    
    const [nom, setNom] = useState(user.nom);
    const [prenom, setPrenom] = useState(user.prenom);
    const [password, setPassword] = useState('');

    const { mutate, isSuccess } = useUpdateUser();

    const handleUpdateUser = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        mutate({ nom, prenom, password });

        if (isSuccess) {
            dispatch(authActions.updateState({
                ...user,
                nom,
                prenom,
            }));
            dispatch(addSuccessSnackbar('Profil mis à jour'));
            setOpen(false)
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="updateUser"
            aria-describedby="mise à jour profil"
        >
            <Box className={styles.modal}>
                <h2 id="updateUser">Modifier son profil</h2>
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

                    <TextField
                        required
                        label="Prénom"
                        value={prenom}
                        id="outlined-size-small"
                        size="small"
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Prénom"
                    />

                    <TextField
                        label="Mot de passe"
                        type='password'
                        value={password}
                        id="outlined-size-small"
                        size="small"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />

                    <Button type="submit" variant="contained" onClick={handleUpdateUser}>Modifier</Button>
                </FormControl>
            </Box>
        </Modal>
    )
}

export default ProfilModal