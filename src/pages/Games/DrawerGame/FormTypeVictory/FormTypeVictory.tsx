import { MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { TYPE_VICTORY_VALUES } from "../../../../utils/Enums/victoryType";
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../../../Layouts/Theme/StyleMui";

type Props = {
    typeVictoire: string
    setTypeVictoire: Dispatch<SetStateAction<string>>
}

const FormTypeVictory: React.FC<Props> = ({ typeVictoire, setTypeVictoire }) => (
    <>
        <label id="typeVictoire">Type de victoire</label>
        <Select
            MenuProps={SELECT_MENU_STYLE}
            sx={SELECT_STYLE}
            id="typeVictoireSelect"
            value={typeVictoire}
            onChange={(e) => setTypeVictoire(e.target.value)}
        >
            {
                TYPE_VICTORY_VALUES.map((type) => (
                    <MenuItem value={type} key={`victoire-${type}`}>
                        {type}
                    </MenuItem>
                ))
            }
        </Select>
    </>
)

export default FormTypeVictory