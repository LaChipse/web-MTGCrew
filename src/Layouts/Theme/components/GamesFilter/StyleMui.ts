import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const STYLED_PAPER = styled(Paper)({
    color: 'var(--primary)', 
    fontFamily: '"Akshar", sans-serif', 
    letterSpacing: '0.3px', 
    backdropFilter: 'blur(7px)',
    borderRadius: '15px',
    border: 'none',
    backgroundColor: 'var(--tertiaryOpacity)',
    'div, span, button': { 
        fontFamily: '"Akshar", sans-serif', 
        letterSpacing: '0.3px', 
    },
    'span, button': {
        color: 'var(--white)', 
    },
    'button' : {
        padding: '3px',
        '&.Mui-selected': { 
            backgroundColor: 'var(--primary)', 
            border: 'none', 
            color: 'var(--secondary)',
            '&:hover': { 
                backgroundColor: 'var(--primary)',
                border: 'none', 
                color: 'var(--secondary)' 
            } 
        }, 
        '&:hover': { 
            backgroundColor: 'var(--primary)', 
            border: 'none', 
            color: 'var(--secondary)' 
        } 
    }
})


export const SELECT_MENU_STYLE = {
    PaperProps: {
        sx: {
            backgroundColor: 'var(--tertiaryOpacity)',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            fontFamily: '"Akshar", sans-serif',
            letterSpacing: '0.3px',
            backdropFilter: 'blur(7px)',
            "&.MuiMenuItem-root": {
                fontSize: 'medium',
                color: "var(--white)",
                fontFamily: '"Akshar", sans-serif',
                letterSpacing: '0.3px',
                "&.Mui-selected": {
                    backgroundColor: 'var(--primary)',
                    border: 'none',
                    color: 'var(--secondary)',
                    opacity: 0.8,
                    "&:hover": {
                        color: "var(--white)",
                        opacity: 1,
                    }
                },
                "&:hover": {
                    backgroundColor: 'var(--primary) !important',
                    border: 'none',
                    color: 'var(--secondary)'
                },
            },
            "ul": {
                "li": {
                    fontSize: 'medium',
                    color: "var(--white)",
                    fontFamily: '"Akshar", sans-serif',
                    letterSpacing: '0.3px',

                    ".Mui-checked": {
                        color: 'var(--secondary)'
                    },
                    "span": {
                        color: 'var(--white)'
                    },  
                    "&:hover" : {
                        backgroundColor: 'var(--primary)',
                        color: 'var(--secondary)',
                        ".MuiTypography-root": {
                            color: 'var(--secondary)',
                        },
                    },
                    "&.Mui-selected": {
                        backgroundColor: 'var(--primary)',
                        color: 'var(--secondary)',
                        opacity: 0.8,
                        '&:hover':{
                            backgroundColor: 'var(--primary)',
                            opacity: 1
                        },
                        ".MuiTypography-root": {
                            color: 'var(--secondary)',
                        },
                    },
                    ".MuiTypography-root": {
                        fontSize: 'medium',
                        color: "var(--white)",
                        fontFamily: '"Akshar", sans-serif',
                        letterSpacing: '0.3px',
                    }
                }
            }
        },
    },
}

export const SELECT_STYLE = {
    color: "var(--white)",
    bgcolor: "var(--tertiaryOpacity)",
    opacity: 0.9,
    borderRadius: "10px",
    fontFamily: '"Akshar", sans-serif',
    letterSpacing: '0.3px',
    fontSize: 'medium   ',
    height: '40px',
    'fieldset':{
        border: 'none'
    },
    'svg': {
        color: 'var(--white)',
    }
}