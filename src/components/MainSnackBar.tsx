
import React from 'react'
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
import { clearSnackbar } from '../store/reducers/snackbarReducer';
import { Snackbar, SnackbarContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import classNames from 'classnames';
import styles from './MainSnackBar.module.scss'

const DEFAULT_SNACKBAR_HIDE = 4000;

type Props = unknown

const MainSnackbar: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const snackbar = useAppSelector((state) => state.snackbar);

    const handleClose = (_: React.SyntheticEvent<unknown> | Event, reason?: string) => {
        if (reason === 'clickaway') return;

        dispatch(clearSnackbar());
    };

    const renderMessage = () => {
        if (Array.isArray(snackbar.message)) {
            return snackbar.message?.map((message) => (
                <div key={message}>{message}<br/></div>
            ));
        }
        else if (typeof snackbar.message === 'string') return snackbar.message;
    };

    return (
        <Snackbar
            autoHideDuration={DEFAULT_SNACKBAR_HIDE}
            open={snackbar.isVisible}
            onClose={handleClose}
            className={styles.snackbar}
        >
            <SnackbarContent
                className={classNames({
                    [styles.success]: snackbar.type === 'success',
                    [styles.info]: snackbar.type === 'info',
                    [styles.error]: snackbar.type === 'error',
                })}
                message={(
                    <div className={styles.message}>
                        <div>
                            {snackbar.type === 'success' && <CheckCircleIcon />}
                            {snackbar.type === 'info' && <InfoIcon />}
                            {snackbar.type === 'error' && <ErrorIcon />}
                        </div>
                        <span>
                            {renderMessage()}
                        </span>
                    </div>
                )}
            />
        </Snackbar>
    );
};

export default MainSnackbar;
