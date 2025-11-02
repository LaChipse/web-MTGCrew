import classNames from 'classnames';
import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import SmallLoading from '../../../../pages/loader/SmallLoading/SmallLoading';
import { LOGIN_PAGE } from '../../../../router/routes';
import { switchType } from '../../../../store/reducers/typeReducer';
import styles from './Header.module.scss';

type Props = unknown

const Header: React.FC<Props> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isStandard = useAppSelector((state) => state.type.isStandard);

    const [isPending, startTransition] = useTransition();
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        if (isPending) timeout = setTimeout(() => setShowLoader(true), 500);
        else {
            setShowLoader(false);
            if (timeout) clearTimeout(timeout);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [isPending]);


    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        startTransition(() => navigate(LOGIN_PAGE))
    }

    const handleSwitch = () => {
        dispatch(switchType())
    }

    return (
        <div className={styles.header}>
            <div>
                <button className={classNames(styles.stdButton, {[styles.isActive]: isStandard})} onClick={handleSwitch}>Standard</button>
                <button className={classNames(styles.specButton, {[styles.isActive]: !isStandard})} onClick={handleSwitch}>Special</button>
            </div>
            <button className={styles.signout}>
                { showLoader ? 
                    <SmallLoading style={{ width: '50px', height: '50px'}} /> 
                    : <div className={styles.signoutIcon} onClick={handleLogout} /> 
                }
            </button>
        </div>
    );
};

export default Header;