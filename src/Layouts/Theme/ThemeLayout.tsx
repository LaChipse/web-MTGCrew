import { Outlet } from 'react-router';
import Navbar from './components/Navbar/Navbar';
import styles from './ThemeLayout.module.scss'

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