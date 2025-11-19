export enum THEME {
    WHITE = 'white',
    GREEN = 'green',
    RED = 'red',
    BLACK = 'black',
    BLUE = 'blue',
    PURPLE = 'purple',
    BROWN = 'brown',
    PINK = 'pink',
    FLASH_BLUE = 'flashBlue',
    FLASH_GREEN = 'flashGreen',
    FLASH_RED = 'flashRed',
    YELLOW = 'yellow'
}

export const COLOR_BY_THEME = {
    [THEME.BLUE]: {
        primary: 'rgba(173, 251, 255, 1)',
        secondary: 'rgba(20, 24, 66, 1)',
        secondaryOpacity: 'rgba(20, 24, 66, 0.6)',
        secondaryRow: 'rgba(20, 24, 66, 0)',
        tertiary: 'rgba(54, 58, 117, 1)',
        tertiaryOpacity: 'rgba(54, 58, 117, 0.6)',
        tertiaryRow: 'rgba(54, 58, 117, 0.1)',
        background: 'rgba(14, 14, 27, 1)',
    },

    [THEME.WHITE]: {
        primary: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(125, 125, 88, 1)',
        secondaryOpacity: 'rgba(125, 125, 88, 0.6)',
        secondaryRow: 'rgba(125, 125, 88, 0)',
        tertiary: 'rgba(207, 212, 158, 1)',
        tertiaryOpacity: 'rgba(207, 212, 158, 0.6)',
        tertiaryRow: 'rgba(207, 212, 158, 0.1)',
        background: 'rgba(30, 30, 23, 1)',
    },

    [THEME.GREEN]: {
        primary: 'rgba(230, 253, 208, 1)',
        secondary: 'rgba(16, 55, 15, 1)',
        secondaryOpacity: 'rgba(16, 55, 15, 0.6)',
        secondaryRow: 'rgba(16, 55, 15, 0)',
        tertiary: 'rgba(56, 134, 64, 1)',
        tertiaryOpacity: 'rgba(56, 134, 64, 0.6)',
        tertiaryRow: 'rgba(56, 134, 64, 0.1)',
        background: 'rgba(11, 17, 12, 1)',
    },

    [THEME.RED]: {
        primary: 'rgba(248, 216, 216, 1)',
        secondary: 'rgba(70, 0, 0, 1)',
        secondaryOpacity: 'rgba(70, 0, 0, 0.6)',
        secondaryRow: 'rgba(70, 0, 0, 0)',
        tertiary: 'rgba(153, 29, 29, 1)',
        tertiaryOpacity: 'rgba(153, 29, 29, 0.6)',
        tertiaryRow: 'rgba(153, 29, 29, 0.1)',
        background: 'rgba(23, 1, 1, 1)',
    },

    [THEME.BLACK]: {
        primary: 'rgba(221, 216, 216, 1)',
        secondary: 'rgba(43, 42, 42, 1)',
        secondaryOpacity: 'rgba(43, 42, 42, 0.6)',
        secondaryRow: 'rgba(43, 42, 42, 0)',
        tertiary: 'rgba(123, 123, 123, 1)',
        tertiaryOpacity: 'rgba(123, 123, 123, 0.6)',
        tertiaryRow: 'rgba(123, 123, 123, 0.1)',
        background: 'rgba(0, 0, 0, 1)',
    },

    [THEME.PURPLE]: {
        primary: 'rgba(255, 223, 252, 1)',
        secondary: 'rgba(55, 3, 57, 1)',
        secondaryOpacity: 'rgba(55, 3, 57, 0.6)',
        secondaryRow: 'rgba(55, 3, 57, 0)',
        tertiary: 'rgba(117, 71, 119, 1)',
        tertiaryOpacity: 'rgba(117, 71, 119, 0.6)',
        tertiaryRow: 'rgba(117, 71, 119, 0.1)',
        background: 'rgba(26, 0, 24, 1)',
    },

    [THEME.BROWN]: {
        primary: 'rgba(249, 228, 180, 1)',
        secondary: 'rgba(89, 44, 3, 1)',
        secondaryOpacity: 'rgba(89, 44, 3, 0.6)',
        secondaryRow: 'rgba(89, 44, 3, 0)',
        tertiary: 'rgba(200, 126, 73, 1)',
        tertiaryOpacity: 'rgba(200, 126, 73, 0.6)',
        tertiaryRow: 'rgba(200, 126, 73, 0.1)',
        background: 'rgba(26, 14, 1, 1)',
    },

    [THEME.PINK]: {
        primary: 'rgba(255,255, 255, 1)',
        secondary: 'rgb(255, 73, 237)',
        secondaryOpacity: 'rgba(255, 73, 237, 0.6)',
        secondaryRow: 'rgba(255, 73, 237, 0)',
        tertiary: 'rgba(255, 165, 240, 1)',
        tertiaryOpacity: 'rgba(255, 165, 240, 0.6)',
        tertiaryRow: 'rgba(255, 165, 240, 0.3)',
        background: 'rgba(255, 192, 254, 1)',
    },

    [THEME.FLASH_BLUE]: {
        primary: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(74, 247, 255, 1)',
        secondaryOpacity: 'rgba(74, 255, 238, 0.6)',
        secondaryRow: 'rgba(74, 247, 255, 0)',
        tertiary: 'rgba(168, 253, 241, 1)',
        tertiaryOpacity: 'rgba(168, 245, 253, 0.6)',
        tertiaryRow: 'rgba(168, 245, 253, 0.1)',
        background: 'rgba(59, 98, 102, 1)',
    },

    [THEME.FLASH_GREEN]: {
        primary: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(114, 255, 74, 1)',
        secondaryOpacity: 'rgba(114, 255, 74, 0.6)',
        secondaryRow: 'rgba(114, 255, 74, 0)',
        tertiary: 'rgba(183, 253, 168, 1)',
        tertiaryOpacity: 'rgba(183, 253, 168, 0.6)',
        tertiaryRow: 'rgba(183, 253, 168, 0.1)',
        background: 'rgba(68, 91, 62, 1)',
    },

    [THEME.FLASH_RED]: {
        primary: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(255, 0, 0, 1)',
        secondaryOpacity: 'rgba(255, 0, 0, 0.6)',
        secondaryRow: 'rgba(255, 0, 0, 0)',
        tertiary: 'rgba(246, 110, 110, 1)',
        tertiaryOpacity: 'rgba(246, 110, 110, 0.6)',
        tertiaryRow: 'rgba(246, 110, 110, 0.1)',
        background: 'rgba(81, 26, 11, 1)',
    },

    [THEME.YELLOW]: {
        primary: 'rgba(255,255, 255, 1)',
        secondary: 'rgba(255, 203, 48, 1)',
        secondaryOpacity: 'rgba(255, 203, 48, 0.6)',
        secondaryRow: 'rgba(255, 203, 48, 0)',
        tertiary: 'rgba(255, 239, 153, 1)',
        tertiaryOpacity: 'rgba(255, 239, 153, 0.6)',
        tertiaryRow: 'rgba(255, 239, 153, 0.1)',
        background: 'rgba(51, 48, 0, 1)',
    }
}