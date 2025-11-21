import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../../../../Layouts/Theme/StyleMui";
import FormPlayerAndDeck from "../../FormPlayerAndDeck/FormPlayerAndDeck";
import { PlayersBlock } from "../../DrawerGame";
import { ROLE_TYPE } from "../../../../../utils/Enums/roleType";

type Props = {
    config: Array<PlayersBlock>
    setConfig: Dispatch<SetStateAction<PlayersBlock[]>>
    index: number
    type: 'archenemy' | 'treachery'
}

const RolePlayersBlock: React.FC<Props> = ({ config, setConfig, index, type }) => {
    const ARCHENEMY_ROLES = [ 'Archenemy', 'Alliés']

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

    const getRoles = () => {
        if (type === 'archenemy') return ARCHENEMY_ROLES
        if (type === 'treachery') return Object.values(ROLE_TYPE)
    }
    
    return (
        <>
            <FormPlayerAndDeck config={config} index={index} setConfig={setConfig}/>

            <FormControl>
                <label id="role">Rôle</label>
                <Select
                    MenuProps={SELECT_MENU_STYLE}
                    sx={SELECT_STYLE}
                    id="roleSelect"
                    value={config?.[index] ? config?.[index].role : ''}
                    onChange={(e) => handleChangeRole(e, index)}
                    renderValue={() => (config?.[index] ? config[index].role : 'Sélectionner un role')}
                >
                    {
                        getRoles()?.map((role) => (
                            <MenuItem value={role} key={role}>
                                {role}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </>
    )
}

export default RolePlayersBlock