import { AppBar, Button, CircularProgress, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const currentPage = sessionStorage.getItem('currentPagePath') || "";

    const navTabs = ['profil', 'decks', 'games', 'joueurs']

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePageNavigation = (path: string) => {
        startTransition(() => {
            sessionStorage.setItem('currentPagePath', path);
            navigate(path);
        });
    };

    const handleMenuItemNavigate = (path: string) => {
        handleClose();
        startTransition(() => {
            sessionStorage.setItem('currentPagePath', path);
            navigate(path);
        });
    }

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
            className={classNames([styles.buttonNav, { [activeStyle]: (currentPage ? currentPage : window.location.pathname) === path }])}
        >
            {label}
        </Button>
    );

    const renderNavMenuItem = (key: string, path: string, label: string) => {

        const isActive = () => (currentPage ? currentPage : window.location.pathname) === path

        return (
            <MenuItem
                key={key}
                sx={{ backgroundColor: isActive() ? '#1976d2' : 'white', color: isActive() ? 'white' : 'black' }}
                onClick={() => handleMenuItemNavigate(path)}
            >
                {label}
            </MenuItem>
        )
    }

    return (
        <AppBar>
            <Toolbar variant="dense" className={styles.navbar}>
                <IconButton
                    id="menu-button"
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className={styles.iconButton}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Menu
                    id="menu-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    className={styles.menuButton}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    {navTabs.map ((navTab) => {
                        return renderNavMenuItem(navTab, `/${navTab}`, toTitleCase(navTab))
                    })}
                </Menu>

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