import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect } from 'react';
import styles from './ThemeLayout.module.scss'

const ThemeLayout = () => {
    const theme = useSelector((state: RootState) => state.theme);

  // Applique les couleurs en CSS variables
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--secondary', theme.secondary);
        root.style.setProperty('--secondaryOpacity', theme.secondaryOpacity);
        root.style.setProperty('--tertiary', theme.tertiary);
        root.style.setProperty('--tertiaryOpacity', theme.tertiaryOpacity);
        root.style.setProperty('--background', theme.background);
        root.style.setProperty('--white', theme.white);
        root.style.setProperty('--black', theme.black);
        root.style.setProperty('--success', theme.success);
        root.style.setProperty('--error', theme.error);
        root.style.setProperty('--currentColor', theme.primary);
    }, [theme]);

    return (
        <div className={styles.layout}>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default ThemeLayout;