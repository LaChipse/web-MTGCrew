import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import ProfilCard from './ProfilCard/ProfilCard';
import ProfilModal from './ProfilModal/ProfilModal';
import HistoryGames from './HistoryGames/HistoryGames';
import Loading from '../Loading/Loading';
import styles from './Profil.module.scss'
import { useCountGames } from '../../hooks/queries/games/useCountGames';

const Profil = () => {
    const user = useAppSelector((state) => state.auth.user);
    const isStandard = useAppSelector((state) => state.type.isStandard);
    const { data: count } = useCountGames(isStandard)

    const [open, setOpen] = useState(false);
    const partieType = isStandard ? 'standard' : 'special'

    const handleOpen = () => {
        setOpen(true);
    };

    if (!user) return <Loading />;

    return (
        <>
            {user && (
                <>
                    <ProfilCard 
                        user={user}
                        count={count}
                        handleOpen={handleOpen}
                        partieType={partieType}
                    />

                    <ProfilModal 
                        user={user}
                        open={open}
                        setOpen={setOpen}
                    />
                </>
            )}

            <div className={styles.history}>
                <h2 style={{color: 'white'}}>Dernières parties jouées</h2>
                <HistoryGames partieType={partieType} isStandard={isStandard}/>
            </div>
        </>
    )
}

export default Profil