import 'dayjs/locale/fr';
import { useEffect, useState } from 'react';
import { useCountHistoryGames } from '../../hooks/queries/games/useCountHistoryGames';
import { useGetHistoryGames } from '../../hooks/queries/games/useGetHistoryGames';
import { useAppSelector } from '../../hooks/useAppSelector';
import GamesArray from '../../Layouts/Theme/components/GamesArray/GamesArray';
import Loading from '../loader/Loading/Loading';
import ProfilCard from './ProfilCard/ProfilCard';
import ProfilModal from './ProfilModal/ProfilModal';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { Deck } from '../../hooks/queries/decks/useGetDecks';
import styles from './Profil.module.scss';
import SmallLoading from '../loader/SmallLoading/SmallLoading';
import Header from '../../Layouts/Theme/components/Header/Header';

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

            <div className={styles.history}>
                <h2 style={{color: 'rgb(197, 195, 195)', marginBottom: 15}}>Dernières parties jouées :</h2>
                { isHistoryGamesLoading ? (
                    <SmallLoading />
                ) :(
                    <GamesArray 
                        games={gameHistory} 
                        divider={10} 
                        page={page}
                        setPage={setPage}
                        count={count} 
                        isHystoric 
                    />
                )}
            </div>

            {deckChoose && (
                <Modal
                    open={!!deckChoose}
                    onClose={()=>setDeckChoose(undefined)}
                    aria-labelledby="imgChoose"
                    aria-describedby="image choisie"
                >
                    <Box className={styles.imageModal}>
                        <p style={{ margin: '5px', fontWeight: 'bold' }}>{deckChoose?.nom}</p>
                        {!!deckChoose!.illustrationUrl && (
                            <img
                                src={`${deckChoose!.illustrationUrl}?w=164&h=164&fit=crop&auto=format`}
                                alt={deckChoose!.illustrationUrl}
                                style={{ borderRadius: '10px', width: '200px' }}
                                loading='lazy'
                            />
                        )}
                    </Box>
                </Modal>
            )}
            
        </>
    )
}

export default Profil