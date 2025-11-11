import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useGetAllDecks } from '../../hooks/queries/decks/useGetAllDecks';
import { useGetAllPlayers } from '../../hooks/queries/joueurs/useGetAllPlayers';
import { useAppSelector } from '../../hooks/useAppSelector';
import { SELECT_MENU_STYLE, SELECT_STYLE } from '../../Layouts/Theme/components/GamesFilter/StyleMui';
import Header from '../../Layouts/Theme/components/Header/Header';
import SmallLoading from '../loader/SmallLoading/SmallLoading';
import styles from './Elo.module.scss';

const Elo = () => {
    const isStandard = useAppSelector((state) => state.type.isStandard);

    const [rank, setRank] = useState(1);
    const { data: decks, isLoading: isDecksLoading } = useGetAllDecks({ key: 'elo', direction: -1 }, { rank })
    const {data: users, isLoading: isUseresLoading } = useGetAllPlayers()

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

    const getUserName = (userId: string) => {
        return users?.find((u) => u.id === userId)?.fullName
    }

    return (
        <>  
            <Header />

            <div className={styles.selectRank}>
                <label id='rank'>Rank</label>
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
            </div>

            

            { isDecksLoading || isUseresLoading ? (
                <SmallLoading heightContainer='70%' dimensionLoader='150px' borderWidth='10px'/>
            ) : (
                <div>
                    <table aria-label='deck table'>
                        <thead>
                            <tr>
                                <th align='center'>Nom</th>
                                <th align='center'>Joueur</th>
                                <th align='center' >Parties Jouées</th>
                                <th align='center'>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {decks?.map((deck) => (
                                <tr key={deck.nom}>
                                    <th align='center' style={{fontWeight: 700}} scope='row'>
                                        <>{deck.nom}</>
                                    </th>
                                    <td align='center'>{getUserName(deck.userId)}</td>
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