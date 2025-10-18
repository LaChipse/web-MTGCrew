import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { TYPE_VICTORY_VALUES } from "../../../../../utils/Enums/victoryType";
import styles from './VictoryBlock.module.scss';
import { ROLE_TYPE } from "../../../../../utils/Enums/roleType";

type Props = {
    victoire: string
    setVictoire: Dispatch<SetStateAction<string>>
    typeVictoire: string
    setTypeVictoire: Dispatch<SetStateAction<string>>
}

const TreacheryVictoryBlock: React.FC<Props> = ({ victoire, setVictoire, typeVictoire, setTypeVictoire }) => (
    <div className={styles.thirdBloc}>
        <FormControl size='small'>
            <InputLabel id="victoire">Role victorieux</InputLabel>
            <Select
                labelId="victoire"
                id="victoireSelect"
                value={victoire}
                onChange={(e) => setVictoire(e.target.value)}
                label="Role victorieux"
            >
                {
                    Object.values(ROLE_TYPE).map((role) => (
                        <MenuItem value={role} key={role}>
                            {role}
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
                    TYPE_VICTORY_VALUES?.map((type) => (
                        <MenuItem value={type} key={type}>
                            {type}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    </div>
)

export default TreacheryVictoryBlock