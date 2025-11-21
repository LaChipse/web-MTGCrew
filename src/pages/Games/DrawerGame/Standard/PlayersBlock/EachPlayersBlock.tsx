import React, { Dispatch, SetStateAction } from "react";
import FormPlayerAndDeck from "../../FormPlayerAndDeck/FormPlayerAndDeck";
import { PlayersBlock } from "../../DrawerGame";

type Props = {
    config: Array<PlayersBlock>
    setConfig: Dispatch<SetStateAction<PlayersBlock[]>>
    index: number
}

const EachPlayersBlock: React.FC<Props> = ({ config, setConfig, index }) => (
    <>
        <FormPlayerAndDeck config={config} index={index} setConfig={setConfig}/>
    </>
)

export default EachPlayersBlock