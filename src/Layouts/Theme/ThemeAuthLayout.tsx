import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setTheme } from '../../store/reducers/themeReducer';
import styles from './ThemeLayout.module.scss'

const ThemeLayout = () => {
    const theme = useSelector((state: RootState) => state.theme);
    const mode = useSelector((state: RootState) => state.type);
    const user = useAppSelector((state) => state.auth.user);

    const dispatch = useDispatch()

    if (user) dispatch(setTheme({ primaryStd: user.colorStd, primarySpec: user.colorSpec}))

  // Applique les couleurs en CSS variables
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary', mode.isStandard ? theme.primaryStd : theme.primarySpec);
        root.style.setProperty('--secondary', theme.secondary);
        root.style.setProperty('--tertiary', theme.tertiary);
        root.style.setProperty('--background', theme.background);
        root.style.setProperty('--white', theme.white);
        root.style.setProperty('--success', theme.success);
        root.style.setProperty('--error', theme.error);
        root.style.setProperty('--currentColor', mode.isStandard ? theme.primaryStd : theme.primarySpec);
    }, [theme, mode]);

    return (
        <div className={styles.layout}>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default ThemeLayout;