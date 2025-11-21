import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { RootState } from '../../store/store';
import Navbar from './components/Navbar/Navbar';
import styles from './ThemeLayout.module.scss';
import { setThemesCss } from '../../utils/setThemesCss';

const ThemeLayout = () => {
    const theme = useSelector((state: RootState) => state.theme);

  // Applique les couleurs en CSS variables
    useEffect(() => {
        const root = document.documentElement;
        setThemesCss(root, theme);
    }, [theme]);

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