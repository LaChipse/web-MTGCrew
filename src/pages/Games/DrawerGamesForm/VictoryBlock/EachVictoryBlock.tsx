import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { TYPE_VICTORY_VALUES } from "../../../../utils/Enums/victoryType";
import styles from './VictoryBlock.module.scss';

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
            <InputLabel id="victoire">Vainqueur</InputLabel>
            <Select
                labelId="victoire"
                id="victoireSelect"
                value={joueurs?.find((joueur) => joueur.userId === victoire)?.joueur}
                onChange={(e) => setVictoire(e.target.value)}
                label="Vainqueur"
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
            <InputLabel id="typeVictoire">Type de victoire</InputLabel>
            <Select
                labelId="typeVictoire"
                id="typeVictoireSelect"
                value={typeVictoire}
                onChange={(e) => setTypeVictoire(e.target.value)}
                label="Type de victoire"
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