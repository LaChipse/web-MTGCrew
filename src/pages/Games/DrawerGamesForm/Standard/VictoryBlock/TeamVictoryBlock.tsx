import { FormControl, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../../../../Layouts/Theme/components/GamesFilter/StyleMui";
import { TYPE_VICTORY_VALUES } from "../../../../../utils/Enums/victoryType";
import styles from './VictoryBlock.module.scss';

type Props = {
    equipes: Array<string | undefined>
    victoire: string
    setVictoire: Dispatch<SetStateAction<string>>
    typeVictoire: string
    setTypeVictoire: Dispatch<SetStateAction<string>>
}

const TeamVictoryBlock: React.FC<Props> = ({ equipes, victoire, setVictoire, typeVictoire, setTypeVictoire }) => (
    <div className={styles.thirdBloc}>
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
                        <MenuItem value={type} key={type}>
                            {type}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    </div>
)                   

export default TeamVictoryBlock