import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, ImageListItem, InputBase, InputLabel, MenuItem, Modal, Paper, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames';
import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { ImageUrisType, useGetCardByName } from '../../../hooks/queries/decks/useGetCardByName';
import { Deck } from '../../../hooks/queries/decks/useGetDecks';
import { useUpdateDeck } from '../../../hooks/queries/decks/useUpdateDeck';
import { useAddDeck } from '../../../hooks/queries/decks/useAddDeck';
import styles from './DecksActionModal.module.scss';
import SmallLoading from '../../loader/SmallLoading/SmallLoading';

type Props = {
    open: boolean
    setOpen: (value: React.SetStateAction<boolean>) => void
    deck?: Deck
}

const DecksActionModal: React.FC<Props> = ({ open, setOpen, deck }) => {
    const [nom, setNom] = useState('');
    const [couleurs, setCouleurs] = useState<Array<string>>([]);
    const [rank, setRank] = useState(1);
    const [type, setType] = useState('');
    const [isImprime, setIsImprime] = useState(false);
    const [illustrationUrl, setIllustrationUrl] = useState<string>()
    const [nameInput, setNameInput] = useState('');
    const [searchCard, setSearchCard] = useState<string>()
    const [showIllustration, setShowIllustration] = useState<boolean>(false)
    const [maxWidthBoxIllustration, setMaxWidthBoxIllustration] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (deck) {
            setNom(deck.nom)
            setCouleurs(deck.couleurs)
            setRank(deck.rank)
            setType(deck.type)
            setIsImprime(deck.isImprime)
            setIllustrationUrl(deck.illustrationUrl)
        }

        if (containerRef.current) {
            setMaxWidthBoxIllustration(containerRef.current.offsetWidth - 5);
        }

        const handleResize = () => {
            if (containerRef.current) {
                setMaxWidthBoxIllustration(containerRef.current.offsetWidth - 5);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [deck, containerRef])

    const { data: illustrationCard, isLoading: isGetillustrationCardLoading } = useGetCardByName(searchCard)
    const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateDeck();
    const { mutate: updateAdd, isPending: isAddPending } = useAddDeck();
    
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

    const getIllustrationUrl = (illustrationCard: Record<'imageUrlSmall' | 'imageUrlNormal', string>) => {
        if (illustrationCard.imageUrlNormal) return illustrationCard.imageUrlNormal;
        if (illustrationCard.imageUrlSmall) return illustrationCard.imageUrlSmall;
    }

    const handleActionDeck = (e: MouseEvent<HTMLButtonElement>) => {
        if (deck) handleUpdateDeck(e)
        else handleAddDeckForm(e)
    };

    const handleUpdateDeck = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        updateMutate({ id: deck!._id, illustrationUrl: illustrationUrl || '', nom, couleurs, isImprime, rank, type });
        setOpen(false)
    };

    const handleAddDeckForm = (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            updateAdd({ nom, illustrationUrl: illustrationUrl || '', couleurs: [...new Set(couleurs)], isImprime, rank, type });
    
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

    const getImageDisplay = (iU: Record<"imageUrlSmall" | "imageUrlNormal", string>) => {
        return (
            <img
                key={iU.imageUrlNormal}
                srcSet={`${getIllustrationUrl(iU)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${getIllustrationUrl(iU)}?w=164&h=164&fit=crop&auto=format`}
                alt={getIllustrationUrl(iU)}
                loading="lazy"
                style={{ cursor: 'pointer', borderRadius: '10px', width: '150px' }}
                onClick={() => handleSetIllustraiton(getIllustrationUrl(iU))}
            />
        )
    }

    return (
        <Modal
            open={open}
            onClick= {() => handleCloseIllustration()}
            onClose={handleClose}
            aria-labelledby="actionDeck"
            aria-describedby="axtion sur deck"
        >

            
            <Box className={styles.modal}>
                
                <div className={styles.container} ref={containerRef}>
                    <h2 id="actionDeck">{deck ? 'Modifier un deck': 'Ajouter un deck'} {
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
                                            style={{ borderRadius: '10px', width: '150px' }}
                                            loading="lazy"
                                        />
                                    </Box>
                                )}
                            </>
                        )
                    }</h2>
                    {   isGetillustrationCardLoading ? (
                        <SmallLoading />
                    ) : (
                        <>
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

                                        {!!illustrationCard && illustrationCard.imageUris && (
                                            <Box className={styles.illustrationBox} sx={{ maxWidth: `${maxWidthBoxIllustration}px`}}>
                                                <ImageListItem key={illustrationCard.id} className={styles.imageListItem}>
                                                    {Array.isArray(illustrationCard.imageUris[0]) ? 
                                                        (illustrationCard.imageUris as ImageUrisType[]).map((imageUris) => {
                                                            return (
                                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                                    {imageUris.map((iU) => (
                                                                        getImageDisplay(iU)
                                                                    ))}
                                                                </div>
                                                            )
                                                        }) : 
                                                        (illustrationCard.imageUris as ImageUrisType).map((iU) => (
                                                            getImageDisplay(iU)
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
                                        <FormControlLabel 
                                            value="incolore" 
                                            style={{ color: 'grey' }} 
                                            control={
                                                <Checkbox style={{ color: 'grey'}} onChange={handleCheckboxChange} checked={couleurs.includes("incolore")} />
                                            } 
                                            label="Incolore" 
                                        />
                                        <FormControlLabel 
                                            value="blanc" 
                                            style={{ color: 'white', textShadow: '0 0 3px rgba(0, 0, 0, 0.8)' }} 
                                            control={
                                                <Checkbox 
                                                    sx={{ 
                                                        filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.5))',
                                                        '&.Mui-checked': {
                                                            color: '#1976d2', // couleur cochée
                                                            filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.5))',
                                                        },
                                                    }}
                                                    style={{ color: 'white' }} 
                                                    onChange={handleCheckboxChange} 
                                                    checked={couleurs.includes("blanc")} 
                                                />
                                            } 
                                            label="Blanc" 
                                        />
                                        <FormControlLabel 
                                            value="bleu" 
                                            style={{ color: 'blue' }} 
                                            control={
                                                <Checkbox style={{ color: 'blue'}} onChange={handleCheckboxChange} checked={couleurs.includes("bleu")} />
                                            } 
                                            label="Bleu" 
                                        />
                                        <FormControlLabel 
                                            value="noir" 
                                            style={{ color: 'black' }} 
                                            control={
                                                <Checkbox style={{ color: 'black'}} onChange={handleCheckboxChange} checked={couleurs.includes("noir")} />
                                            } 
                                            label="Noir" 
                                        />
                                        <FormControlLabel 
                                            value="rouge" 
                                            style={{ color: 'red' }} 
                                            control={
                                                <Checkbox style={{ color: 'red'}} onChange={handleCheckboxChange} checked={couleurs.includes("rouge")} />
                                            } 
                                            label="Rouge"  
                                        />
                                        <FormControlLabel 
                                            value="vert" 
                                            style={{ color: 'green' }} 
                                            control={
                                                <Checkbox style={{ color: 'green'}} onChange={handleCheckboxChange} checked={couleurs.includes("vert")} />
                                            } 
                                            label="Vert" 
                                        />
                                    </FormGroup>
                                </FormControl>
                            </div>
                                
                            <div className={styles.formBloc}>
                                <FormControl className={styles.formControl}>
                                    <FormLabel id="radio-imprime-groupe">Deck imprimé ?</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="radio-imprime-groupe"
                                        defaultValue={deck && deck.isImprime ? true : false}
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
                        </>
                    )}

                    <LoadingButton 
                        disabled={!couleurs.length || !nom.length || deck ? isUpdatePending : isAddPending} 
                        loading={deck ? isUpdatePending : isAddPending} 
                        type="submit" 
                        variant="contained" 
                        onClick={handleActionDeck} 
                        className={styles.submit}
                    >
                            {deck ? 'Modifié': 'Ajouté'}
                    </LoadingButton>  
                </div>
            </Box>
        </Modal>
    )
}

export default DecksActionModal