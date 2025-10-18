import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import classNames from "classnames";
import React, { Dispatch, SetStateAction } from "react";
import { useGetAllDecks } from "../../../../../hooks/queries/decks/useGetAllDecks";
import { useGetAllPlayers } from "../../../../../hooks/queries/joueurs/useGetAllPlayers";
import { PlayersBlock } from "../../Standard/DrawerStandardGamesForm";
import styles from './PlayersBlock.module.scss';
import { ROLE_TYPE } from "../../../../../utils/Enums/roleType";

type Props = {
    config: Array<PlayersBlock>
    setConfig: Dispatch<SetStateAction<PlayersBlock[]>>
    configIndex: number
}

const TreacheryPlayersBlock: React.FC<Props> = ({ config, setConfig, configIndex }) => {
    const {data: decks} = useGetAllDecks()
    const {data: users} = useGetAllPlayers()

    const otherUsersNotSelected = users?.filter((user) => !config.map((conf) => conf.userId).includes(user.id))
    const otherDecksNotSelected = decks?.filter((deck) => !config.map((conf) => conf.deckId).includes(deck.id))

    const getUser = (userId: string) => {
        const user = users?.find((user) => user.id === userId)
        return user?.fullName
    }

    const handleChangeJoueur = (e: SelectChangeEvent<string>, index: number) => {
        const selectedUser = users?.find((user) => user.id === e.target.value);

        setConfig((prevConfig) => {
            const nouvelleConfig = [...(prevConfig || [])];

            if (selectedUser) {
                if (nouvelleConfig[index]) {
                    nouvelleConfig[index] = {
                        ...nouvelleConfig[index],
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

    const handleChangeDeck = (e: SelectChangeEvent<string>, index: number) => {
        const selectedDeck = decks?.find((deck) => deck.id === e.target.value);

        setConfig((prevConfig) => {
            const nouvelleConfig = [...(prevConfig || [])];

            if (selectedDeck) {
                if (nouvelleConfig[index]) {
                    nouvelleConfig[index] = {
                        ...nouvelleConfig[index],
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

    const handleChangeRole = (e: SelectChangeEvent<string>, index: number) => {
        setConfig((prevConfig) => {
            const nouvelleConfig = [...(prevConfig || [])];
            
                if (nouvelleConfig[index]) {
                    nouvelleConfig[index] = {
                        ...nouvelleConfig[index],
                        role: e.target.value
                    }
                } else {
                    nouvelleConfig.push({ role: e.target.value })
                }
            
            return nouvelleConfig;
        });
    }

    const isDeckUser = (userId: string, index: number) => {
        return userId === config?.[index]?.userId || false
    }

    const inputs = Array.from({ length: configIndex }, (_, index) => (
        <>
            <div key={`secondBloc${index}`} className={styles.secondBloc}>
                <FormControl size='small'>
                    <InputLabel id="joueur">{`Joueur ${index + 1}`}</InputLabel>
                    <Select
                        labelId="joueur"
                        id="joueurSelect"
                        value={config?.[index] ? config?.[index].userId : ''}
                        onChange={(e) => handleChangeJoueur(e, index)}
                        renderValue={() => (config?.[index] ? config[index].joueur : 'Sélectionner un joueur')}
                        label="Joueur"
                    >

                        {
                            otherUsersNotSelected?.map((user) => (
                                <MenuItem value={user.id} key={user.id}>{user.fullName}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl size='small'>
                    <InputLabel id="deck">{`Deck ${index + 1}`}</InputLabel>
                    <Select
                        labelId="deck"
                        id="deckSelect"
                        value={config?.[index] ? config?.[index].deckId : ''}
                        onChange={(e) => handleChangeDeck(e, index)}
                        renderValue={() => (config?.[index] ? config[index].deck : 'Sélectionner un deck')}
                        label="Deck"
                    >
                        {
                            otherDecksNotSelected?.map((deck) => (
                                <MenuItem value={deck.id} key={deck.id} className={ classNames({ [styles.green]: isDeckUser(deck.userId, index) })}>
                                    {deck.nom} <span style={{marginLeft: '4px', color: 'grey', fontSize: '12px'}}>{`(${getUser(deck.userId)})`}</span>
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl size='small'>
                    <InputLabel id="role">{`Rôle`}</InputLabel>
                    <Select
                        labelId="role"
                        id="roleSelect"
                        value={config?.[index] ? config?.[index].role : ''}
                        onChange={(e) => handleChangeRole(e, index)}
                        renderValue={() => (config?.[index] ? config[index].role : 'Sélectionner un role')}
                        label="Role"
                    >
                        {
                            Object.values(ROLE_TYPE).map((role) => (
                                <MenuItem value={role} key={role}>
                                    {role}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

            </div>

            <div className={classNames({ [styles.separator]: index  !== (configIndex - 1) })}></div>
        </>
    ));

    
    return (
        <>
            {inputs}
        </>
    )
}

export default TreacheryPlayersBlock