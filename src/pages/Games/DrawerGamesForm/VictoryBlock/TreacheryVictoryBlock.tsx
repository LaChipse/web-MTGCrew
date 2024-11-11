import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import styles from './VictoryBlock.module.scss';

type Props = {
    victoire: string
    setVictoire: Dispatch<SetStateAction<string>>
    typeVictoire: string
    setTypeVictoire: Dispatch<SetStateAction<string>>
}

const TreacheryVictoryBlock: React.FC<Props> = ({ victoire, setVictoire, typeVictoire, setTypeVictoire }) => {
    const roles = [ 'Seigneur', 'Assassin', 'Traitre']
    const typeVictoireEnum = [ 'KO', 'Meule', 'Poison', 'Capacité', 'Egalité', 'Autres']
    
    return (
        <div className={styles.thirdBloc}>
            <FormControl>
                <InputLabel id="victoire">Victoire</InputLabel>
                <Select
                    labelId="victoire"
                    id="victoireSelect"
                    value={victoire}
                    onChange={(e) => setVictoire(e.target.value)}
                    label="victoire"
                >
                    {
                        roles?.map((role) => (
                            <MenuItem value={role} key={role}>
                                {role}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="typeVictoire">Type de victoire</InputLabel>
                <Select
                    labelId="typeVictoire"
                    id="typeVictoireSelect"
                    value={typeVictoire}
                    onChange={(e) => setTypeVictoire(e.target.value)}
                    label="Type de victoire"
                >
                    {
                        typeVictoireEnum?.map((type) => (
                            <MenuItem value={type} key={type}>
                                {type}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default TreacheryVictoryBlock