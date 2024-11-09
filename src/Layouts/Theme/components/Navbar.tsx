import { AppBar, Button, CircularProgress, Toolbar } from '@mui/material';
import classNames from 'classnames';
import React, { useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE } from '../../../router/routes';
import { toTitleCase } from '../../../utils/ToTitleCase';
import styles from './Navbar.module.scss';

type Props = unknown

const Navbar: React.FC<Props> = () => {
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const currentPage = sessionStorage.getItem('currentPagePath') || "";

    const navTabs = ['profil', 'decks', 'games']

    const handlePageNavigation = (path: string) => {
        startTransition(() => {
            sessionStorage.setItem('currentPagePath', path);
            navigate(path);
        });
    };

    const handleLogOut = () => {
        sessionStorage.clear();
        localStorage.clear();
        startTransition(() => navigate(LOGIN_PAGE))
    }

    const renderNavButton = (key: string, path: string, label: string, activeStyle: string) => (
        <Button
            key={key}
            sx={{ color: '#fff' }}
            onClick={() => handlePageNavigation(path)}
            className={classNames({ [activeStyle]: (currentPage ? currentPage : window.location.pathname) === path })}
        >
            {label}
        </Button>
    );

    return (
        <AppBar>
            <Toolbar variant="dense"  className={styles.navbar}>
                <div>
                    {navTabs.map ((navTab) => {
                        return renderNavButton(navTab, `/${navTab}`, toTitleCase(navTab), styles[navTab])
                    })}
                </div>
                <div>
                    <Button color="inherit" onClick={() => handleLogOut()}>Se déconnecter</Button>
                    {isPending && (
                        <CircularProgress color="inherit" size={20} style={{ marginLeft: 10 }} />
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;