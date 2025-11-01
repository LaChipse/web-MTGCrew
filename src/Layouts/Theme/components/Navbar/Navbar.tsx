import { CircularProgress } from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearGameFiltersState } from '../../../../store/reducers/gameFiltersReducer';
import styles from './Navbar.module.scss';

type Props = unknown

const Navbar: React.FC<Props> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [isPending, startTransition] = useTransition();
    const [showLoader, setShowLoader] = useState(false);
    const [nextPath, setNextPath] = useState('')
    const navTabs = ['profil', 'decks', 'games', 'joueurs', 'matchmaking']

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


    const handlePageNavigation = (path: string) => {
        setNextPath(path);
        startTransition(() => {
            sessionStorage.setItem('currentPagePath', path);
            navigate(path);
            dispatch(clearGameFiltersState())
        });
    };

    const handleNavigation = (callback: (key: string, path: string, label: string) => JSX.Element, navTab: string) => {
        return callback(navTab, `/${navTab}`, navTab)
    }

    const renderNavButton = (key: string, path: string, icon: string) => {
        const isActive = () => (location.pathname ? location.pathname : window.location.pathname) === path
        const isLoading = showLoader && path === nextPath
        
        return (
            <button
                key={key}
                onClick={() => handlePageNavigation(path)}
                className={classNames({ [styles.isActive]: isActive() })}
            >
                {
                    isLoading ? <CircularProgress style={{ width: '30px', height: '30px' }} className={classNames(styles.circularLoader, { [styles.isLoading]: isLoading })} /> : (
                        <span className={classNames(styles.icon, styles[icon], { [styles[`icon-active`]]: isActive() } )}></span>
                    )
                }
            </button>
        )
    }

    return (
        <div className={styles.navbar}>
            {navTabs.map((navTab) => handleNavigation(renderNavButton, navTab))}
        </div>
    );
};

export default Navbar;