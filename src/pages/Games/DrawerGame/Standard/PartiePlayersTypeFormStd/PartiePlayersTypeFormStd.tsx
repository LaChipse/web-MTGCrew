import classNames from 'classnames';
import React from "react";
import { PlayersBlock } from '../../DrawerGame';
import EachPlayersBlock from '../PlayersBlock/EachPlayersBlock';
import TeamPlayersBlock from '../PlayersBlock/TeamPlayersBlock';
import styles from './PartiePlayersTypeFormStd.module.scss';

type Props = {
    type: string
    config: Array<PlayersBlock>
    configIndex: number
    setConfig: React.Dispatch<React.SetStateAction<PlayersBlock[]>>
}

const PartiePlayersTypeFormStd: React.FC<Props> = ({ type, config, configIndex, setConfig }) => (
    <>
        <h3> {type === 'team' ? 'Equipes' : 'Joueurs'} </h3>
        {
            Array.from({ length: configIndex }, (_, index) => (
                <>
                    <div key={`secondBloc${index}`} className={styles.secondBloc}>
                        {type === 'each' && (<EachPlayersBlock
                            config={config}
                            setConfig={setConfig}
                            index={index}
                        />)}
                        
                        {type === 'team' && (<TeamPlayersBlock
                            config={config}
                            setConfig={setConfig}
                            index={index}
                        />)}

                    </div>
                    <div key={`separator${index}`} className={classNames({ [styles.separator]: index  !== (configIndex - 1) })}></div>
                </>
            ))
        }
    </>
)

export default PartiePlayersTypeFormStd