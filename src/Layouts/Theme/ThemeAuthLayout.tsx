import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect } from 'react';
import styles from './ThemeLayout.module.scss'

const ThemeLayout = () => {
    const theme = useSelector((state: RootState) => state.theme);
    const mode = useSelector((state: RootState) => state.type);

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