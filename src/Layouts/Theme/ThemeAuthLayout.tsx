import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect } from 'react';
import styles from './ThemeLayout.module.scss'
import { setThemeCss } from '../../utils/SetThemeCss';

const ThemeLayout = () => {
    const theme = useSelector((state: RootState) => state.theme);

  // Applique les couleurs en CSS variables
    useEffect(() => {
        const root = document.documentElement;
        setThemeCss(root, theme);
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