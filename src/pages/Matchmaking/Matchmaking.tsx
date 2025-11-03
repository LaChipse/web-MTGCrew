import { Checkbox, Divider, FormControl, FormControlLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useGetAllDecks } from "../../hooks/queries/decks/useGetAllDecks";
import { useGetAllPlayers } from "../../hooks/queries/joueurs/useGetAllPlayers";
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../Layouts/Theme/components/GamesFilter/StyleMui";
import Header from "../../Layouts/Theme/components/Header/Header";
import SmallLoading from "../loader/SmallLoading/SmallLoading";
import Result from "./Result/Result";
import styles from './Matchmaking.module.scss';
import { useDispatch } from "react-redux";
import { addErrorSnackbar } from "../../store/reducers/snackbarReducer";

const Matchmaking: React.FC = () => {
    const { data: users, isLoading: isUsersLaoding } = useGetAllPlayers()
    const { data: decks, isLoading: isUsersDecksLaoding } = useGetAllDecks()
    const dispatch = useDispatch()

    const [usersChecked, setUsersChecked] = useState<string[]>([]);
    const [nbrParties, setNbrParties] = useState<number | undefined>(undefined);
    const [includedDecks, setIncludedDecks] = useState<string[]>([]);
    const [hasAllDecksSelected, setHasAllDecksSelected] = useState<boolean>(false);
    const [allUserDecksSelected, setAllUserDecksSelected] = useState<string[]>([])
    const [rank, setRank] = useState<string>('');
    const [isTeam, setIsTeam] = useState<boolean>(false);
    const [nbrTeam, setNbrTeam] = useState<number>(2)
    const [isExlusifsDecks, setIsExclusifsDecks] = useState<boolean>(true);
    const [configuration, setConfiguration] = useState<unknown[]>()

    useEffect(() => {
        if (hasAllDecksSelected) {
            setAllUserDecksSelected([])
            setIncludedDecks(decks!.map(d => d.id));
        } else {
            setIncludedDecks([]);
            setAllUserDecksSelected([])
        }
    }, [hasAllDecksSelected, decks]);

    if (isUsersDecksLaoding || isUsersLaoding) return ( <SmallLoading heightContainer='90vh' dimensionLoader='150px' borderWidth='10px' /> )

    const handleChangeJoueurs = (event: SelectChangeEvent<typeof usersChecked>) => {
        const { target: { value } } = event;
        setUsersChecked(typeof value === 'string' ? value.split(',') : value);
    };

    const handleChangeIncludedDecks = (event: SelectChangeEvent<typeof includedDecks>) => {
        const { target: { value } } = event;
        if (value === 'user' || value.includes('user')) return

        setIncludedDecks(typeof value === 'string' ? [...new Set(value.split(','))] : [...new Set(value)]);
    };


    const handleChangeDeckSelected = (deckId: string) => {
        const deckSelected = decks?.find((d) => d.id === deckId)?.userId
        if (allUserDecksSelected.includes(deckSelected!)) setAllUserDecksSelected((prev) => prev.filter((p) => p !== deckSelected))
    }

    const handleAllUserDecksSelected = (userId: string) => {
        setAllUserDecksSelected((prev) => {
            let formatedPrev = [...prev];
            const userDecks = decks!.filter((d) => d.userId === userId).map((d) => d.id)

            if (prev.includes(userId)) {
                formatedPrev = prev.filter((p) => p !== userId)

                setIncludedDecks((prev) => {
                    const formatedPrevDecks = prev.filter((p) => !userDecks.includes(p));
                    return formatedPrevDecks
                })
            } else {
                formatedPrev.push(userId)

                setIncludedDecks((prev) => {
                    const formatedPrevDecks = prev.filter((p) => !userDecks.includes(p));
                    formatedPrevDecks.push(...userDecks)
                    return [...new Set(formatedPrevDecks)]
                })
            }
            return formatedPrev 
        })
    }

    const handleNbrParties = (value: string) => {
        if (!!value && isNaN(Number(value))) setNbrParties(1)
        else setNbrParties( value ? Number(value) : undefined);
    };

    const handleIsTeam = () => {
        setIsTeam(!isTeam)
    }

    const handleExlusifsDecks = () => {
        setIsExclusifsDecks(!isExlusifsDecks)
    }

    const handleResetConfig = () => {
        setUsersChecked([])
        setNbrParties(1)
        setIncludedDecks([])
        setRank('')
        setIsTeam(false)
        setIsExclusifsDecks(true)
        setConfiguration(undefined)
        setNbrTeam(2)
        setHasAllDecksSelected(false)
        setAllUserDecksSelected([])
    }

    const splitArray = (array: Array<Record<string, string>>, parts: number) => {
        const result: Array<Record<string, string>>[] = [];
        const n = array.length;
        const minSize = Math.floor(n / parts); // taille minimale de chaque part
        let extra = n % parts; // les "extras" à répartir

        let start = 0;
        for (let i = 0; i < parts; i++) {
            const size = minSize + (extra > 0 ? 1 : 0); // ajoute 1 si on a encore un "extra"
            result.push(array.slice(start, start + size));
            start += size;
            if (extra > 0) extra--;
        }

        return result;
    }

    const hanldeSetConfig = () => {
        let configSet: unknown[]

        const players = users!.filter((u) => !usersChecked.length ? u : usersChecked.includes(u.id))
                                .map((u) => ({ id: u.id, nom: u.fullName}))

        const selectedDecks = decks!.filter((d) => (rank && rank !== 'all') ? d.rank === Number(rank) : d)
                                    .filter((d) => !includedDecks.length ? d : includedDecks.includes(d.id))
                                    .map((d) => ({ nom: d.nom, user: users?.filter((u) => u.id === d.userId)[0].fullName, userId: d.userId, deckId: d.id}))

        if ((selectedDecks.length < usersChecked.length) || (usersChecked.length === 0 && selectedDecks.length < users!.length)) {
            dispatch(addErrorSnackbar('Vous n\'avez pas séléctionné suffisament de decks'))
            return
        }

        const useDeckIds: string[] = [];

        configSet = players.map((p) => {
            let formatedSelectedDeck = isExlusifsDecks ? selectedDecks!.filter((d) => d.userId === p.id) : selectedDecks
            if (!formatedSelectedDeck.length) formatedSelectedDeck = selectedDecks

            formatedSelectedDeck.filter((d) => !useDeckIds.includes(d.deckId))
            if (!formatedSelectedDeck.length) formatedSelectedDeck = selectedDecks

            const randomIndex = Math.floor(Math.random() * formatedSelectedDeck.length);
            const deck = isExlusifsDecks ? formatedSelectedDeck.splice(randomIndex, 1)[0] : selectedDecks.splice(randomIndex, 1)[0];
            useDeckIds.push(deck.deckId)

            return { player: p.nom, deckNom: deck.nom, deckPlayer: deck.user, idDeck: deck.userId, deckId: deck.deckId };
        });

        configSet = splitArray(configSet as Array<Record<string, string>>, nbrParties ? Number(nbrParties) : 1)
        if (isTeam) configSet = configSet.map((cS) => splitArray(cS as Array<Record<string, string>>, nbrTeam))

        setConfiguration(configSet)
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h2 style={{ textAlign: 'center' }}>Configurer le matchmaking</h2>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <FormControl className={styles.formControl}>
                        <label id="joueursPrésents">{`Joueurs présents`}</label>
                        <Select
                            MenuProps={SELECT_MENU_STYLE}
                            sx={SELECT_STYLE}
                            id="joueursPrésents"
                            multiple
                            value={usersChecked}
                            onChange={(e) => handleChangeJoueurs(e)}
                            renderValue={() => (usersChecked.length)}
                        >

                            {users!.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    <Checkbox checked={usersChecked.includes(user.id)} />
                                    <ListItemText primary={user.fullName} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={styles.formControl}>
                        <label id="nbrParties">Nombre de parties</label>
                        <input
                            placeholder="Nombre de parties"
                            id="nbrParties"
                            value={nbrParties}
                            onChange={(e) => handleNbrParties(e.target.value)}
                        />
                    </FormControl>

                    <FormControl className={styles.formControl}>
                        <label id="decksIncluded">Decks présents</label>
                        <Select
                            MenuProps={{
                                ...SELECT_MENU_STYLE, 
                                MenuListProps: {
                                    // Empêche le MenuList de forcer le focus sur l'item sélectionné
                                    autoFocus: false,
                                    autoFocusItem: false,
                                },
                            }}
                            sx={SELECT_STYLE}
                            id="decksIncluded"
                            multiple
                            value={includedDecks}
                            onChange={(e) => handleChangeIncludedDecks(e)}
                            renderValue={() => (includedDecks.length)}
                        >
                            <MenuItem 
                                key={'allDeck'} 
                                value={'allDeck'}
                                onClick={() => setHasAllDecksSelected(!hasAllDecksSelected)}
                                className={classNames(styles.listItem, {[styles.isSelected]: hasAllDecksSelected})}
                            >
                                <Checkbox 
                                    checked={hasAllDecksSelected} 
                                    onChange={() => setHasAllDecksSelected(!hasAllDecksSelected)}
                                />
                                <ListItemText primary={hasAllDecksSelected ? 'Tout déselectionner' : 'Tout sélectionner'} />
                            </MenuItem>

                            <Divider style={{backgroundColor: 'var(--primary'}}/>

                            {users!.map((user) => (
                                <MenuItem 
                                    key={user.id} 
                                    value={'user'} 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleAllUserDecksSelected(user.id)
                                    }}
                                    className={classNames(styles.listItem, {[styles.isSelected]: allUserDecksSelected.includes(user.id)})}
                                >
                                    <Checkbox checked={allUserDecksSelected.includes(user.id)} onChange={() => handleAllUserDecksSelected(user.id)}/>
                                    <ListItemText primary={`Decks de ${user.fullName}`} />
                                </MenuItem>
                            ))}

                            <Divider style={{backgroundColor: 'var(--primary'}}/>

                            {decks!.filter((d) => (rank && rank !== 'all') ? d.rank === Number(rank) : d).map((deck) => (
                                <MenuItem key={deck.id} value={deck.id} onClick={(e) => {
                                        e.preventDefault();
                                        handleChangeDeckSelected(deck.id)
                                    }}>
                                    <Checkbox checked={includedDecks.includes(deck.id)} onChange={() => handleChangeDeckSelected(deck.id)}/>
                                    <ListItemText primary={`${deck.nom} (${users!.find((u) => deck.userId === u.id)?.fullName})`} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={styles.formControl}>
                        <label id="Rank">Rank</label>
                        <Select
                            MenuProps={SELECT_MENU_STYLE}
                            sx={SELECT_STYLE}
                            id="Rank"
                            value={rank}
                            onChange={((e) => setRank(e.target.value))}
                        >
                            <MenuItem value={'all'}>Peu importe</MenuItem>
                            <MenuItem value={'1'}>1</MenuItem>
                            <MenuItem value={'2'}>2</MenuItem>
                            <MenuItem value={'3'}>3</MenuItem>
                            <MenuItem value={'4'}>4</MenuItem>
                            <MenuItem value={'5'}>5</MenuItem>
                        </Select>
                    </FormControl>

                    {isTeam && (
                        <FormControl className={styles.formControl}>
                            <label id="team">Nombre d'équipe</label>
                            <Select
                                MenuProps={SELECT_MENU_STYLE}
                                sx={SELECT_STYLE}
                                id="team"
                                value={nbrTeam}
                                onChange={((e) => setNbrTeam(Number(e.target.value)))}
                            >
                                <MenuItem value={'2'}>2</MenuItem>
                                <MenuItem value={'3'}>3</MenuItem>
                                <MenuItem value={'3'}>4</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' }}>
                    <FormControl className={styles.formControlCheckbox}>
                        <FormControlLabel 
                            control={<Checkbox checked={isTeam} className={classNames({[styles.checked]: isTeam})} onChange={handleIsTeam} />} 
                            label="Par équipe ?" 
                            className={styles.checkBox}
                        />
                    </FormControl>
                    
                    <FormControl className={styles.formControlCheckbox}>
                        <FormControlLabel 
                            control={<Checkbox checked={isExlusifsDecks} className={classNames({[styles.checked]: isExlusifsDecks})} onChange={handleExlusifsDecks} />} 
                            label="Ses decks exclusivement" 
                            className={styles.checkBox}
                        />
                    </FormControl>  
                </div>

                <div className={styles.buttons}>
                    <button type="submit" style={{marginRight: '20px'}} onClick={hanldeSetConfig}>{configuration?.length ? 'Relancer' : 'Valider'}</button>
                    <button type="submit" onClick={handleResetConfig}>Vider</button>
                </div>
            </div>

            {configuration && configuration.length && (
                <Result configuration={configuration} />
            )}
        </>
    )
}

export default Matchmaking