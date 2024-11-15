import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useAddDeck } from '../../../hooks/queries/decks/useAddDeck';
import classNames from 'classnames';
import { LoadingButton } from '@mui/lab';
import styles from './DecksModal.module.scss';

type Props = {
    open: boolean
    setOpen: (value: React.SetStateAction<boolean>) => void
}

const DecksModal: React.FC<Props> = ({ open, setOpen }) => {
    const [nom, setNom] = useState('');
    const [couleurs, setCouleurs] = useState<Array<string>>([]);
    const [rank, setRank] = useState('');
    const [type, setType] = useState('');
    const [isImprime, setIsImprime] = useState(false);

    const { mutate, isPending } = useAddDeck();

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setCouleurs((prevCouleurs) => checked ? [...prevCouleurs, value] : prevCouleurs.filter((color) => color !== value));
    };

    const handleRadioImprimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        if (value.toString() === 'true') setIsImprime(true)
        else setIsImprime(false)
    }

    const handleAddDeckForm = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate({ nom, couleurs: [...new Set(couleurs)], isImprime, rank, type });

        setNom('')
        setCouleurs([])
        setRank('')
        setType('')
        setIsImprime(false)
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
                <h2 id="addDeck">Ajouter un deck</h2>
                <div className={styles.formBloc}>
                    <FormControl className={styles.formControl}>
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

                    <FormControl className={styles.formControl}>
                        <FormLabel id="checkbox-colors">Couleurs du deck</FormLabel>
                        <FormGroup className={styles.choices}>
                            <FormControlLabel value="incolore" control={<Checkbox onChange={handleCheckboxChange} />} label="Incolore" />
                            <FormControlLabel value="blanc" control={<Checkbox onChange={handleCheckboxChange} />} label="Blanc" />
                            <FormControlLabel value="bleu" control={<Checkbox onChange={handleCheckboxChange} />} label="Bleu" />
                            <FormControlLabel value="noir" control={<Checkbox onChange={handleCheckboxChange} />} label="Noir" />
                            <FormControlLabel value="rouge" control={<Checkbox onChange={handleCheckboxChange} />} label="Rouge" />
                            <FormControlLabel value="vert" control={<Checkbox onChange={handleCheckboxChange} />} label="Vert" />
                        </FormGroup>
                    </FormControl>
                </div>
                    
                <div className={styles.formBloc}>
                    <FormControl className={styles.formControl}>
                        <FormLabel id="radio-imprime-groupe">Deck imprimé ?</FormLabel>
                        <RadioGroup
                            aria-labelledby="radio-imprime-groupe"
                            defaultValue={false}
                            name="radio-imprime-groupe"
                            className={styles.choices}
                        >
                            <FormControlLabel value={false} control={<Radio onChange={handleRadioImprimeChange} />} label="Non" />
                            <FormControlLabel value={true} control={<Radio onChange={handleRadioImprimeChange} />} label="Oui" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl className={classNames([styles.select, styles.formControl])} size="small">
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

                    <FormControl className={classNames([styles.select, styles.formControl])} size="small">
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

                <LoadingButton loading={isPending} type="submit" variant="contained" onClick={handleAddDeckForm} disabled={!couleurs.length || !nom.length || isPending} className={styles.submit}>Ajouter</LoadingButton>      
            </Box>
        </Modal>
    )
}

export default DecksModal