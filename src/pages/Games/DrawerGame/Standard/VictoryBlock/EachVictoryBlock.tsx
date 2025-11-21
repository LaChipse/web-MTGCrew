import { FormControl, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../../../../Layouts/Theme/StyleMui";
import FormTypeVictory from "../../FormTypeVictory/FormTypeVictory";

type Props = {
    joueurs: Array<{joueur?: string, userId?: string}>
    victoire: string
    setVictoire: Dispatch<SetStateAction<string>>
    typeVictoire: string
    setTypeVictoire: Dispatch<SetStateAction<string>>
}

const EachVictoryBlock: React.FC<Props> = ({ joueurs, victoire, setVictoire, typeVictoire, setTypeVictoire }) => (
    <>
        <FormControl >
            <label id="victoire">Vainqueur</label>
            <Select
                MenuProps={SELECT_MENU_STYLE}
                sx={SELECT_STYLE}
                id="victoireSelect"
                value={joueurs?.find((joueur) => joueur.userId === victoire)?.joueur}
                onChange={(e) => setVictoire(e.target.value)}
            >
                {
                    joueurs?.map((joueur) => (
                        <MenuItem value={joueur.userId} key={`victoire-${joueur.userId}`}>
                            {joueur.joueur}
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

export default EachVictoryBlock