import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { RootState } from '../../store/store';
import Navbar from './components/Navbar/Navbar';
import styles from './ThemeLayout.module.scss';

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
        root.style.setProperty('--currentColor', mode.isStandard ? theme.primaryStd : theme.primarySpec);
    }, [theme, mode]);

    return (
        <div className={styles.layout}>
            <main>
                <Outlet />
            </main>
            <Navbar />
        </div>
    );
};

export default ThemeLayout;