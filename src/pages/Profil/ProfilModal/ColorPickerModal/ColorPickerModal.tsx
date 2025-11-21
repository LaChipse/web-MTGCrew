import { Modal } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../../../store/reducers/themeReducer';
import { COLOR_BY_THEME, THEME } from '../../../../utils/Enums/theme';
import { getTheme } from '../../../../utils/getTheme';
import styles from './ColorPickerModal.module.scss';

type Props = {
    isPickColorOpen: boolean
    setIsPickColorOpen: React.Dispatch<React.SetStateAction<"std" | "spec" | undefined>>
    setColor: React.Dispatch<React.SetStateAction<THEME>>
}

const ColorPickerModal: React.FC<Props> = ({ isPickColorOpen, setIsPickColorOpen, setColor }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        setIsPickColorOpen(undefined);
    };

    const handleChangeColor = (theme: THEME) => {
        setColor(theme);
        dispatch(setTheme((getTheme(theme))))
    }

    return (
        <Modal
            open={isPickColorOpen}
            onClose={handleClose}
            aria-labelledby="updateColor"
            aria-describedby="mise à jour couleur"
        >
            <div className={styles.modal}>
                {
                    Object.values(THEME).map((t) => (
                        <div key={t} style={{display: 'flex', alignItems: 'center'}}>
                            <button 
                                style={{
                                    backgroundColor: COLOR_BY_THEME[t].tertiary, 
                                    height: '30px', 
                                    width: '40px', 
                                    marginLeft: '5px',
                                    borderRadius: '5px'
                                }}
                                onClick={() => handleChangeColor(t)}
                            />
                        </div>
                    ))
                }
            </div>

        </Modal>
    )
}

export default ColorPickerModal