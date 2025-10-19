import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, ImageListItem, InputBase, InputLabel, MenuItem, Modal, Paper, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames';
import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useAddDeck } from '../../../hooks/queries/decks/useAddDeck';
import { useGetCardByName } from '../../../hooks/queries/decks/useGetCardByName';
import styles from './DecksModal.module.scss';

type Props = {
    open: boolean
    setOpen: (value: React.SetStateAction<boolean>) => void
}

const DecksModal: React.FC<Props> = ({ open, setOpen }) => {
    const [nom, setNom] = useState('');
    const [couleurs, setCouleurs] = useState<Array<string>>([]);
    const [rank, setRank] = useState(1);
    const [type, setType] = useState('');
    const [isImprime, setIsImprime] = useState(false);
    const [illustrationUrl, setIllustrationUrl] = useState<string>()
    const [nameInput, setNameInput] = useState<string>();
    const [searchCard, setSearchCard] = useState<string>()
    const [showIllustration, setShowIllustration] = useState<boolean>(false)

    const {data: illustrationCard} = useGetCardByName(searchCard)
    const { mutate, isPending } = useAddDeck();

    const handleSearchCard = () => {
        if (nameInput) setSearchCard(nameInput)
        setNameInput(undefined)
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

    const getIllustrationUrl = (illustrationCard: Record<'imageUrlSmall' | 'imageUrlNormal', string>) => {
        if (illustrationCard.imageUrlSmall) return illustrationCard.imageUrlSmall;
        if (illustrationCard.imageUrlNormal) return illustrationCard.imageUrlNormal;
    }

    const handleAddDeckForm = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate({ nom, illustrationUrl: illustrationUrl || '', couleurs: [...new Set(couleurs)], isImprime, rank, type });

        setNom('')
        setCouleurs([])
        setRank(1)
        setType('')
        setIsImprime(false)
        setOpen(false)
        setNameInput('')
        setIllustrationUrl(undefined)
        setSearchCard(undefined)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClick= {() => handleCloseIllustration()}
            onClose={ handleClose }
            aria-labelledby="addDeck"
            aria-describedby="ajout deck"
        >
            <Box className={styles.modal}>
                <div className={styles.container}>
                    <h2 id="addDeck">Ajouter un deck {
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
                                        value={nameInput}
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
                                    <Box className={styles.illustrationBox} >
                                        <ImageListItem key={illustrationCard.id} style={{ display: 'flex', gap: '10px' }}>
                                            {
                                                illustrationCard.imageUris?.map((iU) => (
                                                <img
                                                    srcSet={`${getIllustrationUrl(iU)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                    src={`${getIllustrationUrl(iU)}?w=164&h=164&fit=crop&auto=format`}
                                                    alt={getIllustrationUrl(iU)}
                                                    loading="lazy"
                                                    style={{ cursor: 'pointer', borderRadius: '10px' }}
                                                    onClick={() => handleSetIllustraiton(getIllustrationUrl(iU))}
                                                />
                                                ))
                                            }
                                        </ImageListItem>
                                    </Box>
                                )}
                            </Box>
                        </div>

                        <FormControl className={styles.formControl}>
                            <FormLabel id="checkbox-colors">Couleurs du deck</FormLabel>
                            <FormGroup className={styles.choices}>
                                <FormControlLabel value="incolore" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} />} label="Incolore" />
                                <FormControlLabel value="blanc" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} />} label="Blanc" />
                                <FormControlLabel value="bleu" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} />} label="Bleu" />
                                <FormControlLabel value="noir" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} />} label="Noir" />
                                <FormControlLabel value="rouge" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} />} label="Rouge" />
                                <FormControlLabel value="vert" style={{ color: 'black' }} control={<Checkbox onChange={handleCheckboxChange} />} label="Vert" />
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
                                <FormControlLabel value={false} style={{ color: 'black' }} control={<Radio onChange={handleRadioImprimeChange} />} label="Non" />
                                <FormControlLabel value={true} style={{ color: 'black' }} control={<Radio onChange={handleRadioImprimeChange} />} label="Oui" />
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

                    <LoadingButton loading={isPending} type="submit" variant="contained" onClick={handleAddDeckForm} disabled={!couleurs.length || !nom.length || isPending} className={styles.submit}>Ajouter</LoadingButton>
                </div>      
            </Box>
        </Modal>
    )
}

export default DecksModal