import { Modal } from '@mui/material';
import React from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../../../store/reducers/themeReducer';
import styles from './ColorPickerModal.module.scss';

type Props = {
    isPickColorOpen: boolean
    type?: 'std' | 'spec'
    color: string
    setIsPickColorOpen: React.Dispatch<React.SetStateAction<"std" | "spec" | undefined>>
    setColor: React.Dispatch<React.SetStateAction<string>>
}

const ColorPickerModal: React.FC<Props> = ({ isPickColorOpen, type, color, setIsPickColorOpen, setColor }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        setIsPickColorOpen(undefined);
    };

    const handleChangeColor = (color: ColorResult) => {
        setColor(color.hex);
        dispatch(setTheme({[type === 'std' ? 'primaryStd' : 'primarySpec']: color.hex}))
    }

    return (
        <Modal
            open={isPickColorOpen}
            onClose={handleClose}
            aria-labelledby="updateColor"
            aria-describedby="mise à jour couleur"
        >
            <div className={styles.modal}>
                <ChromePicker color={ color } className={styles.colorPicker} onChange={(color) => handleChangeColor(color)}/>
            </div>

        </Modal>
    )
}

export default ColorPickerModal