import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useUpdateDeck } from '../../../hooks/queries/decks/useUpdateDeck';
import { LoadingButton } from '@mui/lab';
import { Deck } from '../../../hooks/queries/decks/useGetDecks';
import styles from './DecksUpdateModal.module.scss';

type Props = {
    open: boolean
    deck: Deck
    setOpen: (value: React.SetStateAction<boolean>) => void
}

const DecksUpdateModal: React.FC<Props> = ({ open, deck, setOpen }) => {
    const [nom, setNom] = useState('');
    const [couleurs, setCouleurs] = useState<Array<string>>([]);
    const [rank, setRank] = useState('');
    const [type, setType] = useState('');
    const [isImprime, setIsImprime] = useState(false);

    useEffect(() => {
        setNom(deck.nom)
        setCouleurs(deck.couleurs)
        setRank(deck.rank)
        setType(deck.type)
        setIsImprime(deck.isImprime)
    }, [deck])

    const { mutate, isPending } = useUpdateDeck();

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setCouleurs((prevCouleurs) => checked ? [...prevCouleurs, value] : prevCouleurs.filter((color) => color !== value));
    };

    const handleRadioImprimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        if (value.toString() === 'true') setIsImprime(true)
        else setIsImprime(false)
    }

    const handleUpdateDeck = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate({ id: deck._id, nom, couleurs, isImprime, rank, type });
        setOpen(false)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="addDeck"
            aria-describedby="ajout deck"
        >
            <Box className={styles.modal}>
                <div className={styles.formBloc}>
                    <FormControl>
                        <TextField
                            required
                            label="Nom"
                            value={nom}
                            id="Nom"
                            size="small"
                            onChange={(e) => setNom(e.target.value)}
                            placeholder="Nom du deck"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel id="checkbox-colors">Couleurs du deck</FormLabel>
                        <FormGroup className={styles.choices}>
                            <FormControlLabel value="incolore" control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("incolore")} />} label="Incolore" />
                            <FormControlLabel value="blanc" control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("blanc")} />} label="Blanc" />
                            <FormControlLabel value="bleu" control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("bleu")} />} label="Bleu" />
                            <FormControlLabel value="noir" control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("noir")} />} label="Noir" />
                            <FormControlLabel value="rouge" control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("rouge")} />} label="Rouge" />
                            <FormControlLabel value="vert" control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("vert")} />} label="Vert" />
                        </FormGroup>
                    </FormControl>
                </div>
                    
                <div className={styles.formBloc}>
                    <FormControl>
                        <FormLabel id="radio-imprime-groupe">Deck imprimé ?</FormLabel>
                        <RadioGroup
                            aria-labelledby="radio-imprime-groupe"
                            defaultValue={deck.isImprime ? true : false}
                            name="radio-imprime-groupe"
                            className={styles.choices}
                        >
                            <FormControlLabel value={false} control={<Radio onChange={handleRadioImprimeChange} />} label="Non" />
                            <FormControlLabel value={true} control={<Radio onChange={handleRadioImprimeChange} />} label="Oui" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl className={styles.select}>
                        <InputLabel id="Type">Type</InputLabel>
                        <Select
                            labelId="Type"
                            id="Type"
                            value={type}
                            onChange={((e) => setType(e.target.value))}
                            label="Type"
                        >
                            <MenuItem value={'aggro'}>Aggro</MenuItem>
                            <MenuItem value={'midrange'}>Midrange</MenuItem>
                            <MenuItem value={'controle'}>Contrôle</MenuItem>
                            <MenuItem value={'combo'}>Combo</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={styles.select}>
                        <InputLabel id="Rank">Rank</InputLabel>
                        <Select
                            labelId="Rank"
                            id="Rank"
                            value={rank}
                            onChange={((e) => setRank(e.target.value))}
                            label="Rank"
                        >
                            <MenuItem value={'Z'}>Z</MenuItem>
                            <MenuItem value={'S'}>S</MenuItem>
                            <MenuItem value={'A'}>A</MenuItem>
                            <MenuItem value={'B'}>B</MenuItem>
                            <MenuItem value={'C'}>C</MenuItem>
                            <MenuItem value={'D'}>D</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <LoadingButton disabled={isPending} loading={isPending} type="submit" variant="contained" onClick={handleUpdateDeck} className={styles.submit}>Modifié</LoadingButton>      
            </Box>
        </Modal>
    )
}

export default DecksUpdateModal