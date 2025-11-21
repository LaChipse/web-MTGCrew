import { FormControl, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../../../../Layouts/Theme/StyleMui";
import FormTypeVictory from "../../FormTypeVictory/FormTypeVictory";
import { ROLE_TYPE_SIMPLE } from "../../../../../utils/Enums/roleType";

type Props = {
    victoire: string
    setVictoire: Dispatch<SetStateAction<string>>
    typeVictoire: string
    setTypeVictoire: Dispatch<SetStateAction<string>>
    type: 'archenemy' | 'treachery' 
}

const RoleVictoryBlock: React.FC<Props> = ({ victoire, setVictoire, typeVictoire, setTypeVictoire, type }) => {
    const ARCHENEMY_ROLES = [ 'Archenemy', 'Alliés']

    const getRoles = () => {
        if (type === 'archenemy') return ARCHENEMY_ROLES
        if (type === 'treachery') return Object.values(ROLE_TYPE_SIMPLE)
    }
    
    return (
        <>
            <FormControl >
                <label id="victoire">Role victorieux</label>
                <Select
                    MenuProps={SELECT_MENU_STYLE}
                    sx={SELECT_STYLE}
                    id="victoireSelect"
                    value={victoire}
                    onChange={(e) => setVictoire(e.target.value)}
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

            <FormControl >
                <FormTypeVictory typeVictoire={typeVictoire} setTypeVictoire={setTypeVictoire} />
            </FormControl>
        </>
    )
}                  

export default RoleVictoryBlock