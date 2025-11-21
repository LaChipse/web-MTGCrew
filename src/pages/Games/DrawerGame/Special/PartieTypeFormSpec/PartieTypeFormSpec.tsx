import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../../../../Layouts/Theme/StyleMui";

type Props = {
    type: string
    handleTypeChange: (e: SelectChangeEvent<string>) => void
}

const PartieTypeFormSpec: React.FC<Props> = ({ type, handleTypeChange }) => (
    <FormControl>
        <label id="partieType">Type de partie</label>
        <Select
            MenuProps={SELECT_MENU_STYLE}
            sx={SELECT_STYLE}
            id="partieTypeSelect"
            value={type}
            onChange={handleTypeChange}
        >
            <MenuItem value={'treachery'}>Treachery</MenuItem>
            <MenuItem value={'archenemy'}>Archenemy</MenuItem>
        </Select>
    </FormControl>
)

export default PartieTypeFormSpec