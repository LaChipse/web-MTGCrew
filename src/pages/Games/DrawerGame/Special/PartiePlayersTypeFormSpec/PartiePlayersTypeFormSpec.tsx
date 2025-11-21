import classNames from 'classnames';
import React from "react";
import { PlayersBlock } from '../../DrawerGame';
import RolePlayersBlock from '../PlayersBlock/RolePlayersBlock';
import styles from './PartiePlayersTypeFormSpec.module.scss';

type Props = {
    type: string
    config: Array<PlayersBlock>
    configIndex: number
    setConfig: React.Dispatch<React.SetStateAction<PlayersBlock[]>>
}

const PartiePlayersTypeFormSpec: React.FC<Props> = ({ type, config, configIndex, setConfig }) => (
    <>
        <h3>Joueurs et Rôles</h3>
        {
            Array.from({ length: configIndex }, (_, index) => (
                <>
                    <div key={`secondBloc${index}`} className={styles.secondBloc}>
                        {(type === 'archenemy' || type === 'treachery') && (<RolePlayersBlock
                            config={config}
                            setConfig={setConfig}
                            index={index}
                            type={type}
                        />)}
                    </div>
                    <div key={`separator${index}`} className={classNames({ [styles.separator]: index  !== (configIndex - 1) })}></div>
                </>
            ))
        }
    </>
)

export default PartiePlayersTypeFormSpec