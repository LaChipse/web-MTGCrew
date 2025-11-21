import React from "react";
import EachVictoryBlock from "../VictoryBlock/EachVictoryBlock";
import TeamVictoryBlock from "../VictoryBlock/TeamVictoryBlock";
import { PlayersBlock } from "../../DrawerGame";
import styles from './PartieVictoryFormStd.module.scss';

type Props = {
    type: string
    victoire: string
    setVictoire: React.Dispatch<React.SetStateAction<string>>
    typeVictoire: string
    setTypeVictoire: React.Dispatch<React.SetStateAction<string>>
    config: PlayersBlock[]
}

const PartieVictoryFormStd: React.FC<Props> = ({ type, victoire, setVictoire, typeVictoire, setTypeVictoire, config }) => (
    <>
        <h3> {type === 'each' ? 'Vainqueur' : 'Equipe victorieuse'} </h3>
        <div className={styles.thirdBloc}>
            {type === 'each' && (<EachVictoryBlock 
                joueurs={config.map((conf) => ({joueur: conf.joueur, userId: conf.userId}))
                    .filter((item, index, self) => index === self
                    .findIndex((t) => t.userId === item.userId)
                )}
                victoire={victoire}
                setVictoire={setVictoire}
                typeVictoire={typeVictoire}
                setTypeVictoire={setTypeVictoire}
            />)}

            {type === 'team' && (<TeamVictoryBlock 
                equipes={[...new Set(config.map((conf) => (conf.team)))]}
                victoire={victoire}
                setVictoire={setVictoire}
                typeVictoire={typeVictoire}
                setTypeVictoire={setTypeVictoire}
            />)}
        </div>
    </>
)

export default PartieVictoryFormStd