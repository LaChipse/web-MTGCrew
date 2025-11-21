import { Box, Modal } from '@mui/material';
import classNames from 'classnames';
import React, { MouseEvent, useState } from 'react';
import { Deck } from '../../../hooks/queries/decks/useGetDecks';
import { useGetUserDeck } from '../../../hooks/queries/decks/useGetUserDeck';
import { RANK } from '../../../utils/Enums/rank';
import ImagePortal from '../../../Layouts/Theme/components/ImagePortal/ImagePortal';
import SmallLoading from '../../loader/SmallLoading/SmallLoading';
import styles from './UserDeck.module.scss';

type Props = {
    userId: string
    open: boolean
    partieType: 'standard' | 'special',
    setOpen: (value: React.SetStateAction<boolean>) => void
}

const UserDeckModal: React.FC<Props> = ({ userId, open, partieType, setOpen }) => {
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 1 | -1 }>({ key: 'nom', direction: 1 });

    const { data: decks, isLoading: isDecksLoading } = useGetUserDeck(userId, sortConfig);

    const [openDeck, setOpenDeck] = useState<Deck | null>(null); // deck actuellement ouvert
    const [anchor, setAnchor] = useState<DOMRect | null>(null);

    const sortArrow = (column: string) => {
        if (sortConfig?.key !== column) return (<span className={styles.arrowDisabled}>{"▲"}</span>);
        return <span className={styles.arrow}>{sortConfig.direction === 1 ? "▲" : "▼"}</span>;
    };

    const requestSort = (key: string) => {
        let direction: -1 | 1 = 1;

        if (sortConfig?.key === key && sortConfig.direction === 1) {
            direction = -1;
        }

        setSortConfig({ key, direction });
    };

    const handleClick = (deck: Deck, event: MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setAnchor(rect);
        handleOpenImage(deck);
    };

    const handleOpenImage = (deck: Deck) => {
        setOpenDeck((prev) => (prev === deck ? null : deck));
    }

    const handleClose = () => {
        setOpen(false);
    };

    const getImg = (couleur: string) => {
        return (
            <div key={couleur} className={styles.img}>
                <img src={`/assets/${couleur.toLocaleLowerCase()}.svg`} alt={couleur} width="16px" height="16px" />
            </div>
        )
    }

    const formatArray = (arr: Array<string>) => {
        return arr?.map(getImg);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            style={{ backdropFilter: 'blur(3px)'}}
            aria-labelledby="updateUser"
            aria-describedby="mise à jour profil"
        >
            <Box className={styles.modal}>
                { isDecksLoading ? (
                    <SmallLoading heightContainer='70vh' dimensionLoader='150px' borderWidth='10px' />
                ) : (
                    <div className={styles.tableau}>
                        <table aria-label="customized table">
                            <thead>
                                <tr>
                                    <th align="center" onClick={() => requestSort("nom")}>Nom {sortArrow('nom')}</th>
                                    <th align="center">Couleurs</th>
                                    <th align="center" onClick={() => requestSort("rank")}>Rank {sortArrow('rank')}</th>
                                    <th align="center" onClick={() => requestSort(`parties.${partieType}`)}>Nbr parties {sortArrow(`parties.${partieType}`)}</th>
                                    <th align="center" onClick={() => requestSort(`victoires.${partieType}`)}>Victoires {sortArrow(`victoires.${partieType}`)}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {decks?.map((deck) => (
                                    <tr key={deck._id}>
                                        <th align='center' style={{ fontWeight: 700 }} className={styles.styckyCol} scope='row'>
                                            { deck.illustrationUrl ?
                                                <>
                                                    <a style={{ fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }} onClick={(e) => handleClick(deck, e)}>{deck.nom}</a>
                                                    {openDeck?._id === deck._id && anchor && (
                                                        <ImagePortal anchor={anchor} illustrationUrl={openDeck.illustrationUrl}/>
                                                    )}
                                                </>
                                                : <>{deck.nom || '-'}</>
                                            }
                                        </th>
                                        <td style={{lineHeight: 0.5}} align="center">{formatArray(deck.couleurs) || '-'}</td>
                                        <td align="center" className={classNames([styles[RANK[deck.rank].toLocaleUpperCase()], styles.rank])}>
                                            {deck.rank === 0 ? 'RIP' : deck.rank || '-'}
                                        </td>
                                        <td align="center"> { deck.parties?.[partieType] } </td>
                                        <td align="center"> { deck.victoires?.[partieType] } </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Box>
        </Modal>
    )
}

export default UserDeckModal