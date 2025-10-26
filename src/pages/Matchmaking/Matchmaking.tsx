import { Button, Checkbox, Container, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import { useGetAllDecks } from "../../hooks/queries/decks/useGetAllDecks";
import { useGetAllPlayers } from "../../hooks/queries/joueurs/useGetAllPlayers";
import SmallLoading from "../loader/SmallLoading/SmallLoading";
import styles from './Matchmaking.module.scss';
import classNames from "classnames";

const Matchmaking: React.FC = () => {
    const { data: users, isLoading: isUsersLaoding } = useGetAllPlayers()
    const { data: decks, isLoading: isUsersDecksLaoding } = useGetAllDecks()

    const [usersChecked, setUsersChecked] = useState<string[]>([]);
    const [nbrParties, setNbrParties] = useState<number | undefined>(undefined);
    const [includedDecks, setIncludedDecks] = useState<string[]>([]);
    const [rank, setRank] = useState<string>('');
    const [isTeam, setIsTeam] = useState<boolean>(false);
    const [nbrTeam, setNbrTeam] = useState<number>(2)
    const [isExlusifsDecks, setIsExclusifsDecks] = useState<boolean>(true);
    const [configuration, setConfiguration] = useState<unknown[]>()

    if (isUsersDecksLaoding || isUsersLaoding) return ( <SmallLoading /> )

    const handleChangeJoueurs = (event: SelectChangeEvent<typeof usersChecked>) => {
        const { target: { value } } = event;
        setUsersChecked(typeof value === 'string' ? value.split(',') : value);
    };

    const handleChangeIncludedDecks = (event: SelectChangeEvent<typeof includedDecks>) => {
        const { target: { value } } = event;
        setIncludedDecks(typeof value === 'string' ? value.split(',') : value);
    };

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
                                    .map((d) => ({ title: `${d.nom} (${users?.filter((u) => u.id === d.userId)[0].fullName})`, userId: d.userId }))


        configSet = players.map((p) => {
            let formatedSelectedDeck = isExlusifsDecks ? selectedDecks!.filter((d) => d.userId === p.id) : selectedDecks
            if (!formatedSelectedDeck.length) formatedSelectedDeck = selectedDecks

            const randomIndex = Math.floor(Math.random() * formatedSelectedDeck.length);
            const deck = isExlusifsDecks ? formatedSelectedDeck.splice(randomIndex, 1)[0] : selectedDecks.splice(randomIndex, 1)[0];
            return { player: p.nom, title: deck.title };
        });

        configSet = splitArray(configSet as Array<Record<string, string>>, nbrParties ? Number(nbrParties) : 1)
        if (isTeam) configSet = configSet.map((cS) => splitArray(cS as Array<Record<string, string>>, nbrTeam))

        setConfiguration(configSet)
    }

    return (
        <>
            <Container className={styles.container}>
                <h2 style={{ textAlign: 'center' }}>Configurer le matchmaking</h2>
                <div style={{ padding: '10px', display: 'flex', gap: '10px', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <FormControl className={styles.formControl}>
                        <InputLabel id="joueursPrésents">{`Joueurs présents`}</InputLabel>
                        <Select
                            labelId="joueursPrésents"
                            id="joueursPrésents"
                            multiple
                            value={usersChecked}
                            onChange={(e) => handleChangeJoueurs(e)}
                            renderValue={() => (usersChecked.length)}
                            label="Joueurs présents"
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
                        <TextField
                            placeholder="Nombre de parties"
                            id="nbrParties"
                            value={nbrParties}
                            onChange={(e) => handleNbrParties(e.target.value)}
                        />
                    </FormControl>

                    <FormControl className={styles.formControl}>
                        <InputLabel id="decksIncluded">{`Decks présents`}</InputLabel>
                        <Select
                            labelId="decksIncluded"
                            id="decksIncluded"
                            multiple
                            value={includedDecks}
                            onChange={(e) => handleChangeIncludedDecks(e)}
                            renderValue={() => (includedDecks.length)}
                            label="Decks présents"
                        >

                            {decks!.filter((d) => (rank && rank !== 'all') ? d.rank === Number(rank) : d).map((deck) => (
                                <MenuItem key={deck.id} value={deck.id}>
                                    <Checkbox checked={includedDecks.includes(deck.id)} />
                                    <ListItemText primary={`${deck.nom} (${users!.find((u) => deck.userId === u.id)?.fullName})`} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={styles.formControl}>
                        <InputLabel id="Rank">Rank</InputLabel>
                        <Select
                            labelId="Rank"
                            id="Rank"
                            value={rank}
                            onChange={((e) => setRank(e.target.value))}
                            label="Rank"
                        >
                            <MenuItem value={'all'}>Peu importe</MenuItem>
                            <MenuItem value={'1'}>1</MenuItem>
                            <MenuItem value={'2'}>2</MenuItem>
                            <MenuItem value={'3'}>3</MenuItem>
                            <MenuItem value={'4'}>4</MenuItem>
                            <MenuItem value={'5'}>5</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div style={{ padding: '10px', display: 'flex', gap: '10px', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <FormControl className={styles.formControl}>
                        <FormControlLabel 
                            control={<Checkbox checked={isTeam} onChange={handleIsTeam} />} 
                            label="Par équipe ?" 
                            className={styles.checkBox}
                        />
                    </FormControl>

                    {isTeam && (
                        <FormControl className={styles.formControl}>
                            <InputLabel id="team">Nombre d'équipe</InputLabel>
                            <Select
                                labelId="team"
                                id="team"
                                value={nbrTeam}
                                onChange={((e) => setNbrTeam(Number(e.target.value)))}
                                label="team"
                            >
                                <MenuItem value={'2'}>2</MenuItem>
                                <MenuItem value={'3'}>3</MenuItem>
                                <MenuItem value={'3'}>4</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                    
                    <FormControl style={{ flex: 1, minWidth: '250px' }}>
                        <FormControlLabel 
                            control={<Checkbox checked={isExlusifsDecks} onChange={handleExlusifsDecks} />} 
                            label="Ses decks exclusivement" 
                            className={styles.checkBox}
                        />
                    </FormControl>  
                </div>

                <Button type="submit" onClick={hanldeSetConfig}>{configuration?.length ? 'Relancer' : 'Valider'}</Button>
                <Button type="submit" onClick={handleResetConfig}>Reset</Button>
            </Container>

            {configuration && configuration.length && (
                <Container style={{ marginTop: '15px', maxHeight: '500px' }} className={styles.container}>
                    <h2 style={{ textAlign: 'center' }}>Résultat</h2>
                    <div style={{ padding: '10px', overflow: 'auto', height: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {configuration.map((config, index) => (
                            <div key={`config-${index}`}>
                                <h3 key={`h3-${index}`} style={{ margin: '0', color: 'grey' }}>{`Partie ${index + 1} :`}</h3>
                                <div key={`subdiv-${index}`} className={classNames({[styles.containerTeam]: Array.isArray((config as Array<unknown>)[0])})}>
                                    {(config as Array<unknown>).map((conf, index) => {
                                        if (!Array.isArray(conf)) {
                                            return (
                                                <p key={`conf-${index}`} style={{ margin: '5px 0' }}>{`${(conf as Record<string, string>).player} : ${(conf as Record<string, string>).title}`}</p>
                                            )
                                        } else {
                                            return (
                                                <div key={`conf-${index}`}>
                                                    <h4 key={`h4-${index}`} style={{ margin: '10px' }}>{`Equipe ${index + 1} :`}</h4>
                                                        {conf.map((c, index) => {
                                                            return (
                                                                <p key={`conf-${index}`} style={{ margin: '5px 0' }}>{`${(c as Record<string, string>).player} : ${(c as Record<string, string>).title}`}</p>
                                                            )
                                                        })}
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            )}
        </>
    )
}

export default Matchmaking