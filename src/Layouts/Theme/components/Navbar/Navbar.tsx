import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Button, CircularProgress, IconButton, Menu, MenuItem, Switch, Toolbar } from '@mui/material';
import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_PAGE } from '../../../../router/routes';
import { switchType } from '../../../../store/reducers/typeReducer';
import { toTitleCase } from '../../../../utils/ToTitleCase';
import styles from './Navbar.module.scss';
import { clearGameFiltersState } from '../../../../store/reducers/gameFiltersReducer';

type Props = unknown

const Navbar: React.FC<Props> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [isPending, startTransition] = useTransition();
    const [showLoader, setShowLoader] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    const open = Boolean(anchorEl);
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
            dispatch(clearGameFiltersState())
        });
    };

    const handleMenuItemNavigate = (path: string) => {
        handleClose();
        startTransition(() => {
            sessionStorage.setItem('currentPagePath', path);
            navigate(path);
            dispatch(clearGameFiltersState())
        });
    }

    const handleLogOut = () => {
        sessionStorage.clear();
        localStorage.clear();
        startTransition(() => navigate(LOGIN_PAGE))
    }

    const handleNavigation = (callback: (key: string, path: string, label: string) => JSX.Element, navTab: string) => {
        return callback(navTab, `/${navTab}`, toTitleCase(navTab))
    }

    const renderNavButton = (key: string, path: string, label: string) => {
        const isActive = () => (location.pathname ? location.pathname : window.location.pathname) === path

        return (
            <Button
                key={key}
                sx={{ color: '#fff', backgroundColor: isActive() ? '#1976d2' : 'none', }}
                size='small'
                onClick={() => handlePageNavigation(path)}
                className={styles.buttonNav}
            >
                {label}
            </Button>
        )
    }

    const renderNavMenuItem = (key: string, path: string, label: string) => {
        const isActive = () => (location.pathname ? location.pathname : window.location.pathname) === path

        return (
            <MenuItem
                key={key}
                sx={{ backgroundColor: isActive() ? '#1976d2' : 'white', color: isActive() ? 'white' : 'black' }}
                onClick={() => handleMenuItemNavigate(path)}
                style={{fontSize: 15, padding: '6px 20px'}}
            >
                {label}
            </MenuItem>
        )
    }

    return (
        <AppBar style={{backgroundColor:'rgb(29, 29, 29)'}}>
            <Toolbar variant="dense" className={styles.navbar}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt="Avatar" src="/assets/mtgCrew_icon.png" sx={{ width: 35, height: 35 }} style={{marginRight: 10}} className={styles.avatar}/>

                    <IconButton
                        style={{margin: 0}}
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
                    >
                        {navTabs.map((navTab) => handleNavigation(renderNavMenuItem, navTab))}
                    </Menu>


                    <div>
                        {navTabs.map((navTab) => handleNavigation(renderNavButton, navTab))}
                    </div>
                </div>

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{ margin: '0 10px', fontSize: 14 }}>
                        <strong>Std</strong>
                            <Switch size='small' onChange={() => dispatch(switchType())}/>
                        <strong>Spec</strong>
                    </div>
                    <Button size='small' variant="contained" onClick={() => handleLogOut()}>Se déco</Button>
                    {showLoader && (
                        <CircularProgress color="inherit" size={20} style={{ marginLeft: 10, verticalAlign: 'middle' }} />
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;