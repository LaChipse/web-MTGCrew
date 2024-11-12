import { LoadingButton } from '@mui/lab';
import { FormControl, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { MouseEvent, useState } from 'react';
import { useUpdateUser } from '../../../hooks/queries/joueurs/useUpdateUser';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
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

    const { mutate, isSuccess, isPending } = useUpdateUser();

    const handleUpdateUser = (e: MouseEvent<HTMLButtonElement>) => {
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
                        id="nomProfil"
                        size="small"
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Nom"
                    />

                    <TextField
                        required
                        label="Prénom"
                        value={prenom}
                        id="prenomProfil"
                        size="small"
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Prénom"
                    />

                    <TextField
                        label="Mot de passe"
                        type='password'
                        value={password}
                        id="passwordProfil"
                        size="small"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />

                    <LoadingButton disabled={isPending} loading={isPending} type="submit" variant="contained" onClick={handleUpdateUser}>Modifier</LoadingButton>
                </FormControl>
            </Box>
        </Modal>
    )
}

export default ProfilModal