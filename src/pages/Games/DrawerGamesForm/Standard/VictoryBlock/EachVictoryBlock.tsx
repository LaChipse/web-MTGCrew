import { FormControl, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { TYPE_VICTORY_VALUES } from "../../../../../utils/Enums/victoryType";
import styles from './VictoryBlock.module.scss';
import { SELECT_MENU_STYLE, SELECT_STYLE } from "../../../../../Layouts/Theme/components/GamesFilter/StyleMui";

type Props = {
    joueurs: Array<{joueur?: string, userId?: string}>
    victoire: string
    setVictoire: Dispatch<SetStateAction<string>>
    typeVictoire: string
    setTypeVictoire: Dispatch<SetStateAction<string>>
}

const EachVictoryBlock: React.FC<Props> = ({ joueurs, victoire, setVictoire, typeVictoire, setTypeVictoire }) => (
    <div className={styles.thirdBloc}>
        <FormControl size='small'>
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

        <FormControl size='small'>
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
        </FormControl>
    </div>
)

export default EachVictoryBlock