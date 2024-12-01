import { useState } from 'react';
import { useGetHistoryGames } from '../../hooks/queries/games/useGetHistoryGames';
import { useAppSelector } from '../../hooks/useAppSelector';
import GamesArray from '../../Layouts/Theme/components/GamesArray/GamesArray';
import Loading from '../Loading/Loading';
import ProfilCard from './ProfilCard/ProfilCard';
import ProfilModal from './ProfilModal/ProfilModal';
import styles from './Profil.module.scss';

const Profil = () => {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false);

    const user = useAppSelector((state) => state.auth.user);
    const isStandard = useAppSelector((state) => state.type.isStandard);
    const partieType = isStandard ? 'standard' : 'special'

    const { data: gameHistory } = useGetHistoryGames(isStandard, page)

    const gamesPlayed = user?.partiesJouees?.[partieType]

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
                        isStandard={isStandard}
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
                <h2 style={{color: 'rgb(197, 195, 195)', marginBottom: 15}}>Dernières parties jouées :</h2>
                <GamesArray games={gameHistory} divider={10} setPage={setPage} count={gamesPlayed} isHystoric />
            </div>
        </>
    )
}

export default Profil