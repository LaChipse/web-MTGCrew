import React from "react";
import RoleVictoryBlock from "../VictoryBlock/RoleVictoryBlock";
import styles from './PartieVictoryFormSpec.module.scss';

type Props = {
    type: string
    victoire: string
    setVictoire: React.Dispatch<React.SetStateAction<string>>
    typeVictoire: string
    setTypeVictoire: React.Dispatch<React.SetStateAction<string>>
}

const PartieVictoryFormSpec: React.FC<Props> = ({ type, victoire, setVictoire, typeVictoire, setTypeVictoire }) => (
    <>
        <h3> Rôle victorieux </h3>
        <div className={styles.thirdBloc}>
            {(type === 'archenemy' || type === 'treachery') && (<RoleVictoryBlock 
                victoire={victoire}
                setVictoire={setVictoire}
                typeVictoire={typeVictoire}
                setTypeVictoire={setTypeVictoire}
                type={type}
            />)}
        </div>
    </>
)

export default PartieVictoryFormSpec