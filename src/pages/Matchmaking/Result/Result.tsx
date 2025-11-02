import classNames from "classnames";
import React from "react";
import styles from './Result.module.scss';

type Props = {
    configuration: Array<unknown>
}

const Result: React.FC<Props> = ({configuration}) => (
    <div style={{ marginTop: '15px', maxHeight: '500px' }} className={styles.container}>
        <h2 style={{ textAlign: 'center' }}>Résultat</h2>
        <div style={{ padding: '10px', overflow: 'auto', height: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {configuration.map((config, index) => (
                <div key={`config-${index}`}>
                    <h3 key={`h3-${index}`} style={{ margin: '0', color: 'var(--white)' }}>{`Partie ${index + 1} :`}</h3>
                    <div key={`subdiv-${index}`} className={classNames({[styles.containerTeam]: Array.isArray((config as Array<unknown>)[0])})}>
                        {(config as Array<unknown>).map((conf, index) => {
                            if (!Array.isArray(conf)) {
                                return (
                                    <p key={`conf-${index}`} style={{ margin: '5px 0', color: 'var(--white)' }}>
                                        {`${(conf as Record<string, string>).player} : ${(conf as Record<string, string>).deckNom}`}
                                        <span className={styles.userDeck}>{`(${(conf as Record<string, string>).deckPlayer})`}</span>
                                    </p>
                                )
                            } else {
                                return (
                                    <div key={`conf-${index}`}>
                                        <h4 key={`h4-${index}`} style={{ margin: '10px' }}>{`Equipe ${index + 1} :`}</h4>
                                            {conf.map((c, index) => {
                                                return (
                                                    <p key={`conf-${index}`} style={{ margin: '5px 0', color: 'var(--white)' }}>
                                                        {`${(c as Record<string, string>).player} : ${(c as Record<string, string>).deckNom}`}
                                                        <span className={styles.userDeck}>{`(${(c as Record<string, string>).deckPlayer})`}</span>
                                                    </p>
                                                )
                                            })}
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            ))}
        </div>
    </div>
)

export default Result