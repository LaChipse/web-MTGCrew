import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, ImageListItem, InputBase, InputLabel, MenuItem, Modal, Paper, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useUpdateDeck } from '../../../hooks/queries/decks/useUpdateDeck';
import { CardByName, useGetCardByName } from '../../../hooks/queries/decks/useGetCardByName';
import { LoadingButton } from '@mui/lab';
import { Deck } from '../../../hooks/queries/decks/useGetDecks';
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import classNames from 'classnames';
import styles from './DecksUpdateModal.module.scss';

type Props = {
    open: boolean
    deck: Deck
    setOpen: (value: React.SetStateAction<boolean>) => void
}

const DecksUpdateModal: React.FC<Props> = ({ open, deck, setOpen }) => {
    const [nom, setNom] = useState('');
    const [couleurs, setCouleurs] = useState<Array<string>>([]);
    const [rank, setRank] = useState(1);
    const [type, setType] = useState('');
    const [isImprime, setIsImprime] = useState(false);
    const [illustrationUrl, setIllustrationUrl] = useState<string>()
    const [nameInput, setNameInput] = useState('');
    const [searchCard, setSearchCard] = useState<string>()
    const [showIllustration, setShowIllustration] = useState<boolean>(false)

    useEffect(() => {
        setNom(deck.nom)
        setCouleurs(deck.couleurs)
        setRank(deck.rank)
        setType(deck.type)
        setIsImprime(deck.isImprime)
        setIllustrationUrl(deck.illustrationUrl)
    }, [deck])

    const {data: illustrationCard} = useGetCardByName(searchCard)
    const { mutate, isPending } = useUpdateDeck();

    const handleSearchCard = () => {
        if (nameInput) setSearchCard(nameInput)
    }

    const handleSetIllustraiton = (url?: string) => {
        if (url) setIllustrationUrl(url);
        setSearchCard(undefined)
    }

    const handleCloseIllustration = () => {
        if (illustrationCard) setSearchCard(undefined)
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setCouleurs((prevCouleurs) => checked ? [...prevCouleurs, value] : prevCouleurs.filter((color) => color !== value));
    };

    const handleRadioImprimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        if (value.toString() === 'true') setIsImprime(true)
        else setIsImprime(false)
    }

    const getIllustrationUrl = (illustrationCard: CardByName) => {
        if (illustrationCard.imageUrlSmall) return illustrationCard.imageUrlSmall;
        if (illustrationCard.imageUrlNormal) return illustrationCard.imageUrlNormal;
        if (illustrationCard.imageUrlPng) return illustrationCard.imageUrlPng;
    }

    const handleUpdateDeck = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate({ id: deck._id, illustrationUrl: illustrationUrl || '', nom, couleurs, isImprime, rank, type });
        setOpen(false)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClick= {() => handleCloseIllustration()}
            onClose={handleClose}
            aria-labelledby="updateDeck"
            aria-describedby="update deck"
        >
            <Box className={styles.modal}>
                <div className={styles.container}>
                    <h2 id="updateDeck">Modifier un deck {
                        illustrationUrl && (
                            <>
                                <IconButton
                                    type="button"
                                    sx={{ p: '10px' }}
                                    aria-label="search"
                                    onClick={() => setShowIllustration(!showIllustration)}
                                >
                                    <RemoveRedEyeIcon />
                                </IconButton>
                                {showIllustration && (
                                    <Box className={styles.illustrationShow}>
                                        <img
                                            src={`${illustrationUrl}?w=164&h=164&fit=crop&auto=format`}
                                            alt={illustrationUrl}
                                            style={{ borderRadius: '10px' }}
                                            loading="lazy"
                                        />
                                    </Box>
                                )}
                            </>
                        )
                    }</h2>
                    <div className={styles.formBloc}>
                        <div style={{ width: '100%' }}>
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

                            <Box style={{ position: 'relative' }}>
                                <Paper className={styles.paperIllustration} >
                                    <InputBase
                                        id="illustration"
                                        size="small"
                                        style= {{ width: '100%' }}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        placeholder="Choisissez votre illustration (nom en anglais)"
                                    />
                                    <IconButton
                                        type="button"
                                        sx={{ p: '10px' }}
                                        aria-label="search"
                                        onClick={() => handleSearchCard()}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>

                                {!!illustrationCard && (
                                    <Box className={styles.illustrationBox}>
                                        <ImageListItem key={illustrationCard.illustrationId}>
                                            <img
                                                srcSet={`${getIllustrationUrl(illustrationCard)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                src={`${getIllustrationUrl(illustrationCard)}?w=164&h=164&fit=crop&auto=format`}
                                                alt={getIllustrationUrl(illustrationCard)}
                                                loading="lazy"
                                                style={{ cursor: 'pointer', borderRadius: '10px' }}
                                                onClick={() => handleSetIllustraiton(getIllustrationUrl(illustrationCard))}
                                            />
                                        </ImageListItem>
                                    </Box>
                                )}
                            </Box>
                        </div>

                        <FormControl className={styles.formControl}>
                            <FormLabel id="checkbox-colors">Couleurs du deck</FormLabel>
                            <FormGroup className={styles.choices}>
                                <FormControlLabel value="incolore" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("incolore")} />} label="Incolore" />
                                <FormControlLabel value="blanc" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("blanc")} />} label="Blanc" />
                                <FormControlLabel value="bleu" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("bleu")} />} label="Bleu" />
                                <FormControlLabel value="noir" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("noir")} />} label="Noir" />
                                <FormControlLabel value="rouge" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("rouge")} />} label="Rouge" />
                                <FormControlLabel value="vert" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} checked={couleurs.includes("vert")} />} label="Vert" />
                            </FormGroup>
                        </FormControl>
                    </div>
                        
                    <div className={styles.formBloc}>
                        <FormControl className={styles.formControl}>
                            <FormLabel id="radio-imprime-groupe">Deck imprimé ?</FormLabel>
                            <RadioGroup
                                aria-labelledby="radio-imprime-groupe"
                                defaultValue={deck.isImprime ? true : false}
                                name="radio-imprime-groupe"
                                className={styles.choices}
                            >
                                <FormControlLabel value={false} style={{ color: 'black' }} control={<Radio onChange={handleRadioImprimeChange} />} label="Non" />
                                <FormControlLabel value={true} style={{ color: 'black' }} control={<Radio onChange={handleRadioImprimeChange} />} label="Oui" />
                            </RadioGroup>
                        </FormControl>

                        <FormControl className={classNames([styles.select, styles.formControl])}>
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

                        <FormControl className={classNames([styles.select, styles.formControl])}>
                            <InputLabel id="Rank">Rank</InputLabel>
                            <Select
                                labelId="Rank"
                                id="Rank"
                                value={rank.toString()}
                                onChange={((e) => setRank(Number(e.target.value)))}
                                label="Rank"
                            >
                                <MenuItem value={'1'}>1</MenuItem>
                                <MenuItem value={'2'}>2</MenuItem>
                                <MenuItem value={'3'}>3</MenuItem>
                                <MenuItem value={'4'}>4</MenuItem>
                                <MenuItem value={'5'}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <LoadingButton disabled={!couleurs.length || !nom.length || isPending} loading={isPending} type="submit" variant="contained" onClick={handleUpdateDeck} className={styles.submit}>Modifié</LoadingButton>  
                </div>    
            </Box>
        </Modal>
    )
}

export default DecksUpdateModal