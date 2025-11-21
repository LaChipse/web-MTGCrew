import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../../../../Layouts/Theme/StyleMui";

type Props = {
    type: string
    handleTypeChange: (e: SelectChangeEvent<string>) => void
}

const PartieTypeFormStd: React.FC<Props> = ({ type, handleTypeChange }) => (
    <FormControl>
        <label id="user">Mode de jeu</label>
        <Select
            MenuProps={SELECT_MENU_STYLE}
            sx={SELECT_STYLE}
            id="partieTypeSelect"
            value={type}
            onChange={handleTypeChange}
        >
            <MenuItem value={'each'}>Chacun pour soi</MenuItem>
            <MenuItem value={'team'}>Equipe</MenuItem>
        </Select>
    </FormControl>
)

export default PartieTypeFormStd