import { FormControl, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../../../../Layouts/Theme/StyleMui";
import FormTypeVictory from "../../FormTypeVictory/FormTypeVictory";

type Props = {
    equipes: Array<string | undefined>
    victoire: string
    setVictoire: Dispatch<SetStateAction<string>>
    typeVictoire: string
    setTypeVictoire: Dispatch<SetStateAction<string>>
}

const TeamVictoryBlock: React.FC<Props> = ({ equipes, victoire, setVictoire, typeVictoire, setTypeVictoire }) => (
    <>
        <FormControl >
            <label id="victoryTeam">Equipe victorieuse</label>
            <Select
                MenuProps={SELECT_MENU_STYLE}
                sx={SELECT_STYLE}
                id="victoireSelect"
                value={victoire}
                onChange={(e) => setVictoire(e.target.value)}
            >
                {
                    equipes?.map((equipe) => (
                        <MenuItem value={equipe} key={equipe}>
                            {equipe}
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

export default TeamVictoryBlock