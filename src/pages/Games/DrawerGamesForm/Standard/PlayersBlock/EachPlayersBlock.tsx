import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import classNames from "classnames";
import React, { Dispatch, SetStateAction } from "react";
import { useGetAllDecks } from "../../../../../hooks/queries/decks/useGetAllDecks";
import { useGetAllPlayers } from "../../../../../hooks/queries/joueurs/useGetAllPlayers";
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../../../../Layouts/Theme/components/GamesFilter/StyleMui";
import { PlayersBlock } from "../DrawerStandardGamesForm";
import styles from './PlayersBlock.module.scss';

type Props = {
    config: Array<PlayersBlock>
    setConfig: Dispatch<SetStateAction<PlayersBlock[]>>
    configIndex: number
}

const EachPlayersBlock: React.FC<Props> = ({ config, setConfig, configIndex }) => {
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

    const handleChangeDeck = (e: SelectChangeEvent<string>,  index: number) => {
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

    const isDeckUser = (userId: string, index: number) => {
        return userId === config?.[index]?.userId || false
    }

    const inputs = Array.from({ length: configIndex }, (_, index) => (
        <>
            <div key={`secondBloc${index}`} className={styles.secondBloc}>
                <FormControl >
                    <label id="user">{`Joueur ${index + 1}`}</label>
                    <Select
                        MenuProps={SELECT_MENU_STYLE}
                        sx={SELECT_STYLE}
                        id="joueurSelect"
                        value={config?.[index] ? config?.[index].userId : ''}
                        onChange={(e) => handleChangeJoueur(e, index)}
                        renderValue={() => (config?.[index] ? config[index].joueur : '')}
                    >

                        {
                            otherUsersNotSelected?.map((user) => (
                                <MenuItem value={user.id} key={user.id}>{user.fullName}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl >
                    <label id="user">{`Deck ${index + 1}`}</label>
                    <Select
                        MenuProps={SELECT_MENU_STYLE}
                        sx={SELECT_STYLE}
                        id="deckSelect"
                        value={config?.[index] ? config?.[index].deckId : ''}
                        onChange={(e) => handleChangeDeck(e, index)}
                        renderValue={() => (config?.[index] ? config[index].deck : '')}
                    >
                        {
                            otherDecksNotSelected?.map((deck) => (
                                <MenuItem value={deck.id} key={deck.id} className={classNames(styles.MenuItem, { [styles.owner]: isDeckUser(deck.userId, index) })}>
                                    <div className={styles.name}>{deck.nom}</div> <span className={styles.span}>{`(${getUser(deck.userId)})`}</span>
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

export default EachPlayersBlock