import { Outlet } from 'react-router';
import styles from './ThemeLayout.module.scss'

const ThemeLayout = () => {
    return (
        <div className={styles.layout}>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default ThemeLayout;