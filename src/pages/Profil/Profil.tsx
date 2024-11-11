import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import ProfilCard from './ProfilCard/ProfilCard';
import ProfilModal from './ProfilModal/ProfilModal';
import HistoryGames from './HistoryGames/HistoryGames';
import styles from './Profil.module.scss'

const Profil = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            {user && (
                <>
                    <ProfilCard 
                        user={user}
                        handleOpen={handleOpen}
                    />

                    <ProfilModal 
                        user={user}
                        open={open}
                        setOpen={setOpen}
                    />
                </>
            )}

            <div className={styles.history}>
                <HistoryGames />
            </div>
        </>
    )
}

export default Profil