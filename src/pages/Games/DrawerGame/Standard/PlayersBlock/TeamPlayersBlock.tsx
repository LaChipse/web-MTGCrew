import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../../../../Layouts/Theme/StyleMui";
import FormPlayerAndDeck from "../../FormPlayerAndDeck/FormPlayerAndDeck";
import { PlayersBlock } from "../../DrawerGame";

type Props = {
    config: Array<PlayersBlock>
    setConfig: Dispatch<SetStateAction<PlayersBlock[]>>
    index: number
}

const TeamPlayersBlock: React.FC<Props> = ({ config, setConfig, index }) => {
    const teams = [ '1', '2', '3', '4', '5']

    const handleChangeTeam = (e: SelectChangeEvent<string>, index: number) => {
        setConfig((prevConfig) => {
            const nouvelleConfig = [...(prevConfig || [])];
            
                if (nouvelleConfig[index]) {
                    nouvelleConfig[index] = {
                        ...nouvelleConfig[index],
                        team: e.target.value
                    }
                } else {
                    nouvelleConfig.push({ team: e.target.value })
                }
            
            return nouvelleConfig;
        });
    }
    return (
        <>
            <FormPlayerAndDeck config={config} index={index} setConfig={setConfig}/>

            <FormControl >
                <label id="team">Equipe</label>
                <Select
                    MenuProps={SELECT_MENU_STYLE}
                    sx={SELECT_STYLE}
                    id="teamSelect"
                    value={config?.[index] ? config?.[index].team : ''}
                    onChange={(e) => handleChangeTeam(e, index)}
                    renderValue={() => (config?.[index] ? config[index].team : 'Sélectionner une équipe')}
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
        </>
    )
}

export default TeamPlayersBlock