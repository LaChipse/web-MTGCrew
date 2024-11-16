import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { TYPE_VICTORY_VALUES } from "../../../../utils/Enums/victoryType";
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
        <FormControl size='small'>
            <InputLabel id="victoire">Victoire</InputLabel>
            <Select
                labelId="victoire"
                id="victoireSelect"
                value={victoire}
                onChange={(e) => setVictoire(e.target.value)}
                label="victoire"
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