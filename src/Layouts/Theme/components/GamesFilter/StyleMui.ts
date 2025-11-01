export const DATE_PICKER_STYLE = {
    popper: { 
        sx: {
            '.MuiPaper-root': {
                backgroundColor: 'rgba(47, 51, 107, 0.2)',
                borderRadius: 10,
                color: 'var(--primary)',
                fontFamily: '"Akshar", sans-serif',
                letterSpacing: '0.3px',
                backdropFilter: 'blur(7px)',
                '.MuiPickersCalendarHeader-labelContainer': {
                    fontFamily: '"Akshar", sans-serif',
                    letterSpacing: '0.3px',
                },
                '.MuiDateCalendar-root': {
                    maxHeight: '300px'
                },
                'span': {
                    color: 'var(--white)',
                },
                'button': {
                    color: 'var(--white)',
                    border: 'none',
                    
                    '&.Mui-selected': {
                        backgroundColor: 'var(--primary)',
                        border: 'none',
                        color: 'var(--secondary)'
                    },
                    '&:hover': {
                        backgroundColor: 'var(--primary)',
                        border: 'none',
                        color: 'var(--secondary)'
                    }
                }
            },
        }, 
    },
}

export const SELECT_MENU_STYLE = {
    PaperProps: {
        sx: {
            backgroundColor: 'rgba(47, 51, 107, 0.2)',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            fontFamily: '"Akshar", sans-serif',
            letterSpacing: '0.3px',
            backdropFilter: 'blur(7px)',
            "& .MuiMenuItem-root": {
                fontSize: 'smaller',
                color: "var(--white)",
                fontFamily: '"Akshar", sans-serif',
                letterSpacing: '0.3px',
                "&.Mui-selected": {
                    backgroundColor: 'var(--primary)',
                    border: 'none',
                    color: 'var(--secondary)',

                    "&:hover": {
                        color: "var(--white)"
                    }
                },
                "&:hover": {
                    backgroundColor: 'var(--primary)',
                    border: 'none',
                    color: 'var(--secondary)'
                },
            },
        },
    },
}

export const SELECT_STYLE = {
    color: "var(--white)",
    bgcolor: "rgba(47, 51, 107, 0.4)",
    borderRadius: "10px",
    fontFamily: '"Akshar", sans-serif',
    letterSpacing: '0.3px',
    fontSize: 'small',
    height: '45px',
    'fieldset':{
        border: 'none'
    },
    'svg': {
        color: 'var(--white)',
    }
}