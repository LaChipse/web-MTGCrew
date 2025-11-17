import { FormControl, Modal } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import { useUpdateUser } from '../../../hooks/queries/joueurs/useUpdateUser';
import { AuthUser } from '../../../store/reducers/authReducer';
import SmallLoading from '../../loader/SmallLoading/SmallLoading';
import ColorPickerModal from './ColorPickerModal/ColorPickerModal';
import { COLOR_BY_THEME } from '../../../utils/Enums/theme';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { switchType } from '../../../store/reducers/typeReducer';
import styles from './ProfilModal.module.scss';

type Props = {
    user: AuthUser
    open: boolean
    setOpen: (value: React.SetStateAction<boolean>) => void
}

const ProfilModal: React.FC<Props> = ({ user, open, setOpen }) => {
    const dispatch = useDispatch();
    const isStandard = useAppSelector((state) => state.type.isStandard);

    const [nom, setNom] = useState(user.nom);
    const [prenom, setPrenom] = useState(user.prenom);
    const [password, setPassword] = useState('');
    const [colorStd, setColorStd] = useState(user.colorStd)
    const [colorSpec, setColorSpec] = useState(user.colorSpec)
    const [isPickColorOpen, setIsPickColorOpen] = useState<'std' | 'spec' | undefined>()

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

    const handleColorPickerChange = (type: 'std' | 'spec') => {
        setIsPickColorOpen((prev) => {
            if (prev === type) return undefined
            return type
        })

        if (isStandard && type === 'std') return
        if (!isStandard && type === 'spec') return
        dispatch(switchType())
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
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p style={{ color: 'var(--white)', fontSize: '14px', marginBottom: '5px', display: 'flex' }}>Standard</p>
                            <div>
                                <div className={styles.clorPickerButton} style={{backgroundColor: COLOR_BY_THEME[colorStd].secondary}} onClick={() => handleColorPickerChange('std')}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p style={{ color: 'var(--white)', fontSize: '14px', marginBottom: '5px', display: 'flex' }}>Spécial</p>
                            <div>
                                <div className={styles.clorPickerButton} style={{backgroundColor: COLOR_BY_THEME[colorSpec].secondary}} onClick={() => handleColorPickerChange('spec')}></div>
                            </div>
                        </div>
                    </div>

                    <button 
                        disabled={isPending} 
                        type="submit" 
                        onClick={handleUpdateUser}
                        className={styles.updateButton}
                    >
                        { isPending ? <SmallLoading heightContainer='100%' dimensionLoader='10px' borderWidth='3px' />: 'Modifier'}
                    </button>
                </FormControl>

                <ColorPickerModal
                    isPickColorOpen={!!isPickColorOpen}
                    setColor={isPickColorOpen === 'std' ? setColorStd : setColorSpec}
                    setIsPickColorOpen={setIsPickColorOpen}
                />
            </div>
        </Modal>
    )
}

export default ProfilModal