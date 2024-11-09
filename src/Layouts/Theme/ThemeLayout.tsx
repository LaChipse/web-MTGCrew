import { Outlet } from 'react-router';
import styles from './ThemeLayout.module.scss'
import Navbar from './components/Navbar';

const ThemeLayout = () => {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default ThemeLayout;