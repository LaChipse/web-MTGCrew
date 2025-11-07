import { Drawer } from "@mui/material";
import classNames from "classnames";
import React, { useState } from "react";
import Match from "../Match/Match";
import styles from './Result.module.scss';

type Props = {
    configuration: Array<unknown>
    ref?: React.Ref<HTMLDivElement> 
}

const Result: React.FC<Props> = ({configuration, ref}) => {
    const [selectedConf, setSelectedCong] = useState<Array<Record<string, string>>>()
    const [isOpened, setIsOpened] = useState(false);

    const configPartie = (conf: Record<string, string>, index: number) => {
        return (
            <p key={`conf-${index}`} style={{ margin: '5px 0', color: 'var(--white)' }}>
                {`${(conf as Record<string, string>).player} : ${(conf as Record<string, string>).deckNom}`}
                <span className={styles.userDeck}>{`(${(conf as Record<string, string>).deckPlayer})`}</span>
            </p>
        )
    }

    const handleSetConf = (config: Array<Record<string, string>>) => {
        setSelectedCong(config)
        if (config) setIsOpened(true)

    }

    return (
        <>
            <div ref={ref} style={{ marginTop: '15px', maxHeight: '500px' }} className={styles.container}>
                <h2 style={{ textAlign: 'center' }}>Résultat</h2>
                <div style={{ padding: '10px', overflow: 'auto', height: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {configuration.map((config, index) => (
                        <div key={`config-${index}`}>
                            <h3 key={`h3-${index}`} style={{ margin: '0', color: 'var(--white)' }}>{`Partie ${index + 1} :`}</h3>
                            <div key={`subdiv-${index}`} className={classNames({[styles.containerTeam]: Array.isArray((config as Array<unknown>)[0])})}>
                                {(config as Array<Array<Record<string, string>> | Record<string, string>>).map((conf, index) => {
                                    if (!Array.isArray(conf)) return (configPartie(conf as Record<string, string>, index))
                                    else {
                                        return (
                                            <div key={`conf-${index}`}>
                                                <h4 key={`h4-${index}`} style={{ margin: '10px' }}>{`Equipe ${index + 1} :`}</h4>
                                                { conf.map((c, index) => (configPartie(c as Record<string, string>, index))) }
                                            </div>
                                        )
                                    }
                                })}
                                { (config as Array<Record<string, string>>).length < 5 && !Array.isArray((config as Array<Record<string, string>>)[0]) && (
                                    <button style={{ marginTop: '10px' }} onClick={() => handleSetConf(config as Array<Record<string, string>>)}>LANCER !</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Drawer 
                sx={{
                    color: "var(--white)",
                    backdropFilter: 'blur(3px)',
                    fontFamily: '"Akshar", sans-serif',
                    letterSpacing: '0.3px',
                    fontSize: 'medium',
                    '.MuiPaper-root':{
                        bgcolor: "rgba(47, 51, 107, 0.6)",
                        backdropFilter: 'blur(3px)',
                        width: '100vw'
                    },

                    '@media (max-width:650px)': {
                        '.MuiPaper-root': {
                            width: '100%',
                        }
                    }
                }} 
                open={isOpened} 
                onClose={() => setIsOpened(false)} 
                anchor='right' 
                className={styles.drawer}
            >
                <Match conf={selectedConf!} toggleDrawer={setIsOpened} />
            </Drawer>
        </>
    )
}

export default Result