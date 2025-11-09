/* eslint-disable react-hooks/set-state-in-effect */
import { FormControl, FormControlLabel, ImageListItem, MenuItem, Modal, Radio, RadioGroup, Select } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames';
import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useAddDeck } from '../../../hooks/queries/decks/useAddDeck';
import { ImageUrisType, useGetCardByName } from '../../../hooks/queries/decks/useGetCardByName';
import { Deck } from '../../../hooks/queries/decks/useGetDecks';
import { useUpdateDeck } from '../../../hooks/queries/decks/useUpdateDeck';
import { SELECT_MENU_STYLE, SELECT_STYLE } from '../../../Layouts/Theme/components/GamesFilter/StyleMui';
import SmallLoading from '../../loader/SmallLoading/SmallLoading';
import styles from './DecksActionModal.module.scss';

type Props = {
    open: boolean
    setOpen: (value: React.SetStateAction<boolean>) => void
    deck?: Deck
}

const DECK_COLORS= ['incolore', 'blanc', 'bleu', 'noir', 'rouge', 'vert']

const DecksActionModal: React.FC<Props> = ({ open, setOpen, deck }) => {
    const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateDeck();
    const { mutate: updateAdd, isPending: isAddPending } = useAddDeck();

    const [deckFetch, setDeckFetch] = useState<Deck>()
    const [nom, setNom] = useState('');
    const [couleurs, setCouleurs] = useState<Array<string>>([]);
    const [rank, setRank] = useState(1);
    const [type, setType] = useState<string>('');
    const [isImprime, setIsImprime] = useState(false);
    const [illustrationUrl, setIllustrationUrl] = useState<string>('')
    const [imageArt, setImageArt] = useState<string>('')
    const [nameInput, setNameInput] = useState('');
    const [searchCard, setSearchCard] = useState<string>()
    const [showIllustration, setShowIllustration] = useState<boolean>(false)
    const [maxWidthBoxIllustration, setMaxWidthBoxIllustration] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const { data: illustrationCard, isLoading: isGetillustrationCardLoading } = useGetCardByName(searchCard)

    useEffect(() => {
        if (deck && (deck !== deckFetch)) {
            setDeckFetch(deck)
            setNom(deck.nom)
            setCouleurs(deck.couleurs)
            setRank(deck.rank)
            setType(deck.type)
            setIsImprime(deck.isImprime)
            setIllustrationUrl(deck.illustrationUrl)
            setImageArt(deck.imageArt)
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
    }, [deck, open, illustrationCard, illustrationUrl, deckFetch])
    
    const handleSearchCard = () => {
        if (nameInput) setSearchCard(nameInput)
    }

    const handleSetIllustraiton = (url: string, art?: string) => {
        setIllustrationUrl(url);
        setImageArt(art || url)
        setSearchCard(undefined)
    }

    const handleCloseIllustration = () => {
        if (illustrationCard) setSearchCard(undefined)
    };

    const handleCheckboxChange = (color: string) => {
        let newColors: Array<string>
        if (couleurs.includes(color)) {
            newColors = couleurs.filter((c) => c !== color)
        } else {
            newColors = [...couleurs, color]
        }
        setCouleurs(newColors)
    };

    const handleRadioImprimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        if (value.toString() === 'true') setIsImprime(true)
        else setIsImprime(false)
    }

    const getIllustrationUrl = (illustrationCard: Record<'imageUrlSmall' | 'imageUrlNormal' | 'imageArt', string>) => {
        if (illustrationCard.imageUrlNormal) return illustrationCard.imageUrlNormal;
        if (illustrationCard.imageUrlSmall) return illustrationCard.imageUrlSmall;
        return ''
    }

    const handleActionDeck = (e: MouseEvent<HTMLButtonElement>) => {
        if (deck) handleUpdateDeck(e)
        else handleAddDeckForm(e)
    };

    const handleUpdateDeck = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        updateMutate({ id: deck!._id, illustrationUrl: illustrationUrl || '', imageArt, nom, couleurs, isImprime, rank, type });
        setOpen(false)
    };

    const handleAddDeckForm = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        updateAdd({ nom, illustrationUrl: illustrationUrl || '', imageArt, couleurs: [...new Set(couleurs)], isImprime, rank, type });

        setNom('')
        setCouleurs([])
        setRank(1)
        setType('')
        setIsImprime(false)
        setOpen(false)
        setNameInput('')
        setIllustrationUrl('')
        setSearchCard(undefined)
        setImageArt('')
    };

    const handleClose = () => {
        handleCloseIllustration()
        setDeckFetch(undefined)
        setShowIllustration(false)
        setOpen(false);
    };

    const getImageDisplay = (iU: Record<"imageUrlSmall" | "imageUrlNormal" | "imageArt", string>) => {
        return (
            <img
                key={iU.imageUrlNormal}
                srcSet={`${getIllustrationUrl(iU)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${getIllustrationUrl(iU)}?w=164&h=164&fit=crop&auto=format`}
                alt={getIllustrationUrl(iU)}
                loading="lazy"
                style={{ cursor: 'pointer', borderRadius: '10px', width: '150px' }}
                onClick={() => handleSetIllustraiton(getIllustrationUrl(iU), iU.imageArt)}
            />
        )
    }

    return (
        <Modal
            open={open}
            onClick={() => { if(showIllustration) setShowIllustration(false)}}
            onClose={handleClose}
            aria-labelledby="actionDeck"
            aria-describedby="action sur deck"
            style={{ backdropFilter: 'blur(3px)'}}
        >
            <div className={styles.modal}>
                <div className={styles.container} ref={containerRef}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <h2 id="actionDeck">{deck ? 'Modifier un deck': 'Ajouter un deck'} {
                            illustrationUrl && (
                                <>
                                    <button onClick={() => setShowIllustration(!showIllustration)} className={styles.look}>
                                            <div className={styles.lookIcon} />
                                    </button>
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
                        }
                        </h2>
                        <button className={styles.close} onClick={handleClose}>X</button>
                    </div>
                    { isGetillustrationCardLoading ? (
                        <SmallLoading heightContainer='20vh' dimensionLoader='100px' borderWidth='10px'/>
                    ) : (
                        <>
                            <div className={styles.formBloc}>
                                <div style={{ width: '100%' }}>
                                    <FormControl className={styles.formControl}>
                                        <label>Nom du deck</label>
                                        <input
                                            required
                                            value={nom}
                                            id="Nom"
                                            onChange={(e) => setNom(e.target.value)}
                                            placeholder="Nom du deck"
                                        />
                                    </FormControl>

                                    <Box style={{ position: 'relative' }}>
                                        <div style={{display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px'}}>
                                            <input
                                                id="illustration"
                                                style={{width: '100%'}}
                                                value={nameInput}
                                                onChange={(e) => setNameInput(e.target.value)}
                                                placeholder="Choisir votre illustration (anglais)"
                                            />
                                            <button onClick={handleSearchCard} className={styles.search}>
                                                <div className={styles.searchIcon} />
                                            </button>
                                        </div>
                                        {!!illustrationCard && illustrationCard.imageUris && (
                                            <Box className={styles.illustrationBox} sx={{ maxWidth: `${maxWidthBoxIllustration}px`}}>
                                                <ImageListItem key={illustrationCard.id} className={styles.imageListItem}>
                                                    {Array.isArray(illustrationCard.imageUris[0]) ? 
                                                        (illustrationCard.imageUris as ImageUrisType[]).map((imageUris, index) => (
                                                                <div style={{ display: 'flex', gap: '5px' }} key={index}>
                                                                    {imageUris.map((iU) => (
                                                                        getImageDisplay(iU)
                                                                    ))}
                                                                </div>
                                                            )) : 
                                                        (illustrationCard.imageUris as ImageUrisType).map((iU) => (
                                                            getImageDisplay(iU)
                                                        ))
                                                    }
                                                </ImageListItem>
                                            </Box>
                                        )}
                                    </Box>
                                </div>

                                <div className={classNames(styles.formControl, styles.formCouleurs)}>
                                    <label id="checkbox-colors">Couleurs du deck</label>
                                    <div className={styles.couleursBloc}>

                                        {
                                            DECK_COLORS.map((color) => (
                                                <button 
                                                    key={color}
                                                    className={classNames(styles.buttonColor, {[styles.checked]: couleurs.includes(color)})} 
                                                    onClick={() => handleCheckboxChange(color)} 
                                                    style={{backgroundImage: `url(/assets/${color}.svg)`}} 
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                                
                            <div className={styles.formBloc}>
                                <FormControl className={styles.formControl}>
                                    <label id="radio-imprime-groupe">Deck imprimé ?</label>
                                    <RadioGroup
                                        aria-labelledby="radio-imprime-groupe"
                                        defaultValue={deck && deck.isImprime ? true : false}
                                        name="radio-imprime-groupe"
                                        className={styles.choices}
                                    >
                                        <FormControlLabel value={false} className={styles.radioButton} control={<Radio onChange={handleRadioImprimeChange} />} label="Non" />
                                        <FormControlLabel value={true} className={styles.radioButton} control={<Radio onChange={handleRadioImprimeChange} />} label="Oui" />
                                    </RadioGroup>
                                </FormControl>

                                <FormControl className={classNames([styles.select, styles.formControl])}>
                                    <label id="Type">Type</label>
                                    <Select
                                        MenuProps={SELECT_MENU_STYLE}
                                        sx={SELECT_STYLE}
                                        id="Type"
                                        value={type}
                                        onChange={((e) => setType(e.target.value))}
                                    >
                                        <MenuItem value={'aggro'}>Aggro</MenuItem>
                                        <MenuItem value={'midrange'}>Midrange</MenuItem>
                                        <MenuItem value={'controle'}>Contrôle</MenuItem>
                                        <MenuItem value={'combo'}>Combo</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl className={classNames([styles.select, styles.formControl])}>
                                    <label id="Rank">Rank</label>
                                    <Select
                                        MenuProps={SELECT_MENU_STYLE}
                                        sx={SELECT_STYLE}
                                        id="Rank"
                                        value={rank.toString()}
                                        onChange={((e) => setRank(Number(e.target.value)))}
                                    >
                                        <MenuItem value={'0'}>0</MenuItem>
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
    
                    <button 
                        disabled={
                            (!couleurs.length || !nom.length) ||
                            (deck ? isUpdatePending : isAddPending)
                        }   
                        type="submit" 
                        onClick={handleActionDeck}
                        className={styles.updateButton}
                    >
                        {deck ? 'Modifier': 'Ajouter'}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default DecksActionModal