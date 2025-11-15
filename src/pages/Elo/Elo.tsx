import { MenuItem, Select } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { DeckResume, useGetAllDecks } from '../../hooks/queries/decks/useGetAllDecks';
import { useGetAllPlayers } from '../../hooks/queries/joueurs/useGetAllPlayers';
import { useAppSelector } from '../../hooks/useAppSelector';
import { SELECT_MENU_STYLE, SELECT_STYLE } from '../../Layouts/Theme/components/GamesFilter/StyleMui';
import Header from '../../Layouts/Theme/components/Header/Header';
import SmallLoading from '../loader/SmallLoading/SmallLoading';
import ImagePortal from '../Decks/composants/ImagePortal/ImagePortal';
import styles from './Elo.module.scss';
import { useUpdateRank } from '../../hooks/queries/decks/useUpdateRank';

type formatedDeck = DeckResume & { owner?: string } 

const Elo = () => {
    const isStandard = useAppSelector((state) => state.type.isStandard);

    const [rank, setRank] = useState(1);

    const [openDeck, setOpenDeck] = useState<DeckResume | null>(null); // deck actuellement ouvert
    const [anchor, setAnchor] = useState<DOMRect | null>(null);
    const [searchDeck, setSearchDeck] = useState('')
    const [searchUser, setSearchUser] = useState('')

    const { data: decks, isLoading: isDecksLoading } = useGetAllDecks({ key: 'elo', direction: -1 }, { rank })
    const {data: users, isLoading: isUseresLoading } = useGetAllPlayers()
    const { mutate: updateRank } = useUpdateRank();

    if (!isStandard) return ( 
        <>
            <Header />
            <div className={styles.noData}>
                <h1>
                    NO DATA
                </h1>
            </div>
        </>
    )

    const formatDeckWithOwner = () => {
        const formatedDecks = decks!.map((d) => ({
            ...d,
            owner: users?.find((u) => u.id === d.userId)!.fullName
        }))

        const filteredByDeckName = filterDeck(formatedDecks, 'nom', searchDeck)
        const filteredByUserNameAndDeck = filterDeck(filteredByDeckName, 'owner', searchUser)

        return filteredByUserNameAndDeck
    }

    const filterDeck = (formatedDecks: Array<formatedDeck>, key: keyof formatedDeck, searchValue: string) => {
        return formatedDecks.filter((d) => ((d[key] as string).toLocaleLowerCase()).includes(searchValue.toLocaleLowerCase()))
    }

    const handleClick = (deck: DeckResume, event: MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setAnchor(rect);
        handleOpenImage(deck);
    };

    const handleUpdateRank =() => {
        updateRank()
    }

    const handleOpenImage = (deck: DeckResume) => {
        setOpenDeck((prev) => (prev === deck ? null : deck));
    }

    const colorByPoint = (elo: number) => {
        if (elo >= 5) return 'rgba(6, 190, 50, 0.9)'
        if (elo === 4) return 'rgba(7, 150, 40, 0.8)'
        if (elo === 3) return 'rgba(8, 110, 30, 0.7)'
        if (elo === 2) return 'rgba(9, 70, 20, 0.6)'
        if (elo === 1) return 'rgba(10, 30, 10, 0.5)'
        if (elo === -1) return 'rgba(30, 10, 10, 0.5)'
        if (elo === -2) return 'rgba(70, 9, 20, 0.6)'
        if (elo === -3) return 'rgba(110, 8, 30, 0.7)'
        if (elo === -4) return 'rgba(150, 7, 40, 0.8)'
        if (elo <= -5) return 'rgba(190, 6, 50, 0.9)'
        return ''
    }

    return (
        <>  
            <Header />

            <div style={{width: '250px', marginBottom: '15px'}}>
                <input
                    id="searcDeck"
                    style={{ width: '100%' }}
                    value={searchDeck}
                    onChange={(e) => setSearchDeck(e.target.value)}
                    placeholder="Cherchez un deck"
                />
            </div>

            <div style={{width: '250px', marginBottom: '20px'}}>
                <input
                    id="searcUser"
                    style={{ width: '100%' }}
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    placeholder="Cherchez un joueur"
                />
            </div>

            <div className={styles.selectRank}>
                <label id='rank'>Rank : </label>
                <Select
                    MenuProps={SELECT_MENU_STYLE}
                    sx={SELECT_STYLE}
                    id="Rank"
                    value={rank.toString()}
                    onChange={((e) => setRank(Number(e.target.value)))}
                >
                    <MenuItem value={'1'}>1</MenuItem>
                    <MenuItem value={'2'}>2</MenuItem>
                    <MenuItem value={'3'}>3</MenuItem>
                    <MenuItem value={'4'}>4</MenuItem>
                    <MenuItem value={'5'}>5</MenuItem>
                </Select>
                <button style={{marginLeft: '15px'}} onClick={handleUpdateRank}>Mettre à niveau les ranks</button>                
            </div>

            { isDecksLoading || isUseresLoading ? (
                <SmallLoading heightContainer='70%' dimensionLoader='150px' borderWidth='10px'/>
            ) : (
                <div className={styles.tableau}>
                    <table aria-label='deck table'>
                        <thead>
                            <tr>
                                <th align='center'>Nom</th>
                                <th align='center'>Joueur</th>
                                <th align='center' >Parties</th>
                                <th align='center'>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formatDeckWithOwner().filter((d) => (d.nom.toLocaleLowerCase()).includes(searchDeck.toLocaleLowerCase())).map((deck) => (
                                <tr key={deck.id} style={{backgroundColor: colorByPoint(deck.elo)}}>
                                    <th align='center' className={styles.styckyCol} style={{fontWeight: 700}} scope='row'>
                                        { deck.imageUrl ?
                                        <>
                                            <a style={{ cursor: 'pointer', color: 'white', textDecoration: 'underline' }} onClick={(e) => handleClick(deck, e)}>{deck.nom}</a>
                                            {openDeck && openDeck?.id === deck.id && anchor && (
                                                <ImagePortal anchor={anchor} illustrationUrl={openDeck.imageUrl}/>
                                            )}
                                        </>
                                        : <>{deck.nom}</>
                                    }
                                    </th>
                                    <td align='center'>{deck.owner}</td>
                                    <td align='center'>{deck.games.standard}</td>
                                    <td align='center'>{deck.elo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default Elo