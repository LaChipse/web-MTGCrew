export const DATE_PICKER_STYLE = {
  popper: {
    disablePortal: true,
    sx: {
      '.MuiPaper-root': {
        backgroundColor: 'rgba(47, 51, 107, 0.2)',
        WebkitBackdropFilter: 'blur(7px)',
        backdropFilter: 'blur(7px)',
        borderRadius: 2,
        color: 'var(--primary)',
        fontFamily: '"Akshar", sans-serif',
        letterSpacing: '0.3px',
      },

      '.MuiPickersCalendarHeader-labelContainer': {
        fontFamily: '"Akshar", sans-serif',
      },

      '.MuiDateCalendar-root': {
        maxHeight: '300px',
      },

      'button': {
        color: 'var(--white) !important',
        border: 'none',

        '&.Mui-selected': {
          backgroundColor: 'var(--primary)',
          color: 'var(--secondary)',
        },
      },
    }
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
            "&.MuiMenuItem-root": {
                fontSize: 'medium',
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
                        ".Mui-checked": {
                            color: 'var(--primary)'
                        },
                        ".MuiTypography-root": {
                            color: 'var(--secondary)',
                        },
                    },
                    "&.Mui-selected": {
                        backgroundColor: 'var(--primary)',
                        color: 'var(--secondary)',
                        "&:hover": {
                            color: 'var(--white)',
                            ".MuiTypography-root": {
                                color: 'var(--white)',
                            },
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
    bgcolor: "rgba(47, 51, 107, 0.7)",
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