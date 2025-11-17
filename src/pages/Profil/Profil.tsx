import { Modal } from '@mui/material';
import 'dayjs/locale/fr';
import { useEffect, useState } from 'react';
import { Deck } from '../../hooks/queries/decks/useGetDecks';
import { useCountHistoryGames } from '../../hooks/queries/games/useCountHistoryGames';
import { useGetHistoryGames } from '../../hooks/queries/games/useGetHistoryGames';
import { useAppSelector } from '../../hooks/useAppSelector';
import GamesArray from '../../Layouts/Theme/components/GamesArray/GamesArray';
import Header from '../../Layouts/Theme/components/Header/Header';
import Loading from '../loader/Loading/Loading';
import SmallLoading from '../loader/SmallLoading/SmallLoading';
import ProfilCard from './ProfilCard/ProfilCard';
import ProfilModal from './ProfilModal/ProfilModal';
import GamesFilter from '../../Layouts/Theme/components/GamesFilter/GamesFilter';
import styles from './Profil.module.scss';

const Profil = () => {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false);
    const [deckChoose, setDeckChoose] = useState<Deck>()

    const user = useAppSelector((state) => state.auth.user);
    const isStandard = useAppSelector((state) => state.type.isStandard);
    const filters = useAppSelector((state) => state.gameFilters);
    
    const partieType = isStandard ? 'standard' : 'special'

    const { data: gameHistory, refetch: refetchHistoryGames, isLoading: isHistoryGamesLoading } = useGetHistoryGames(isStandard, page, filters)
    const { data: count, refetch: refetchCountHistory } = useCountHistoryGames(isStandard, filters)

    useEffect(() => {
        refetchHistoryGames();
        refetchCountHistory();
    }, [filters, refetchHistoryGames, refetchCountHistory])

    if (!user) return <Loading />;

    return (
        <>
            <Header />
            {user && (
                <>
                    <ProfilCard 
                        user={user}
                        isStandard={isStandard}
                        handleOpen={() => setOpen(true)}
                        handleImageChoose={(i) => setDeckChoose(i)}
                        partieType={partieType}
                    />

                    <ProfilModal 
                        user={user}
                        open={open}
                        setOpen={setOpen}
                    />
                </>
            )}

            <GamesFilter />

            <div className={styles.history}>
                { isHistoryGamesLoading ? (
                    <SmallLoading heightContainer='40vh' dimensionLoader='150px' borderWidth='10px' />
                ) :(
                    <GamesArray 
                        games={gameHistory} 
                        divider={10} 
                        page={page}
                        setPage={setPage}
                        count={count}
                    />
                )}
            </div>

            { deckChoose && (
                <Modal
                    open={!!deckChoose}
                    onClose={()=>setDeckChoose(undefined)}
                    aria-labelledby="imgChoose"
                    aria-describedby="image choisie"
                    style={{ backdropFilter: 'blur(3px)'}}
                >
                    <div className={styles.imageModal}>
                        <p style={{ margin: '5px', fontWeight: 'bold' }}>{deckChoose?.nom}</p>
                        {!!deckChoose!.illustrationUrl && (
                            <img
                                src={`${deckChoose!.illustrationUrl}?w=164&h=164&fit=crop&auto=format`}
                                alt={deckChoose!.illustrationUrl}
                                style={{ borderRadius: '10px', width: '200px' }}
                                loading='lazy'
                            />
                        )}
                    </div>
                </Modal>
            )}
            
        </>
    )
}

export default Profil