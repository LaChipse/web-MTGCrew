import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useGetAllDecks } from "../../../../hooks/queries/useGetAllDecks";
import { useGetAllPlayers } from "../../../../hooks/queries/useGetAllPlayers";
import React, { Dispatch, SetStateAction } from "react";
import { PlayersBlock } from "../DrawerGamesForm";
import styles from './PlayersBlock.module.scss'

type Props = {
    config: Array<PlayersBlock>
    setConfig: Dispatch<SetStateAction<PlayersBlock[]>>
    configIndex: number
}

const TeamPlayersBlock: React.FC<Props> = ({ config, setConfig, configIndex }) => {
    const {data: decks} = useGetAllDecks()
    const {data: users} = useGetAllPlayers()

    const teams = [ '1', '2', '3', '4', '5']

    const newIndex = configIndex - 1;

    const getUser = (userId: string) => {
        const user = users?.find((user) => user.id === userId)
        return user?.fullName
    }

    const handleChangeJoueur = (e: SelectChangeEvent<string>) => {
        const selectedUser = users?.find((user) => user.id === e.target.value);

        setConfig((prevConfig) => {
            const nouvelleConfig = [...(prevConfig || [])];

            if (selectedUser) {
                if (nouvelleConfig[newIndex]) {
                    nouvelleConfig[newIndex] = {
                        ...nouvelleConfig[newIndex],
                        joueur: selectedUser.fullName, 
                        userId: selectedUser.id
                    }
                } else {
                    nouvelleConfig.push({ joueur: selectedUser.fullName, userId: selectedUser.id })
                }
            }
            
            return nouvelleConfig;
        });
    }

    const handleChangeDeck = (e: SelectChangeEvent<string>) => {
        const selectedDeck = decks?.find((deck) => deck.id === e.target.value);

        setConfig((prevConfig) => {
            const nouvelleConfig = [...(prevConfig || [])];

            if (selectedDeck) {
                if (nouvelleConfig[newIndex]) {
                    nouvelleConfig[newIndex] = {
                        ...nouvelleConfig[newIndex],
                        deck: selectedDeck.nom, 
                        deckId: selectedDeck.id
                    }
                } else {
                    nouvelleConfig.push({ deck: selectedDeck.nom, deckId: selectedDeck.id })
                }
            }
            
            return nouvelleConfig;
        });
    }

    const handleChangeTeam = (e: SelectChangeEvent<string>) => {

        setConfig((prevConfig) => {
            const nouvelleConfig = [...(prevConfig || [])];

            
                if (nouvelleConfig[newIndex]) {
                    nouvelleConfig[newIndex] = {
                        ...nouvelleConfig[newIndex],
                        team: e.target.value
                    }
                } else {
                    nouvelleConfig.push({ team: e.target.value })
                }
            
            return nouvelleConfig;
        });
    }

    const inputs = Array.from({ length: configIndex }, (_, index) => (
        <div key={index} className={styles.secondBloc}>
            <FormControl>
                <InputLabel id="joueur">{`Joueur ${index + 1}`}</InputLabel>
                <Select
                    labelId="joueur"
                    id="joueurSelect"
                    value={config?.[index] ? config?.[index].userId : ''}
                    onChange={handleChangeJoueur}
                    renderValue={() => (config?.[index] ? config[index].joueur : 'Sélectionner un joueur')}
                    label="Joueur"
                >

                    {
                        users?.map((user) => (
                            <MenuItem value={user.id} key={user.id}>{user.fullName}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="deck">{`Deck ${index + 1}`}</InputLabel>
                <Select
                    labelId="deck"
                    id="deckSelect"
                    value={config?.[index] ? config?.[index].deckId : ''}
                    onChange={handleChangeDeck}
                    renderValue={() => (config?.[index] ? config[index].deck : 'Sélectionner un deck')}
                    label="Deck"
                >
                    {
                        decks?.map((deck) => (
                            <MenuItem value={deck.id} key={deck.id}>
                                {deck.nom} <span style={{marginLeft: '4px', color: 'grey', fontSize: '12px'}}>{`(${getUser(deck.userId)})`}</span>
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="team">{`Equipe`}</InputLabel>
                <Select
                    labelId="team"
                    id="teamSelect"
                    value={config?.[index] ? config?.[index].team : ''}
                    onChange={handleChangeTeam}
                    renderValue={() => (config?.[index] ? config[index].team : 'Sélectionner une équipe')}
                    label="Equipe"
                >
                    {
                        teams?.map((team) => (
                            <MenuItem value={team} key={team}>
                                {team}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    ));

    
    return (
        <>
            {inputs}
        </>
    )
}

export default TeamPlayersBlock