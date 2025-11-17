export enum THEME {
    WHITE = 'white',
    GREEN = 'green',
    RED = 'red',
    BLACK = 'black',
    BLUE = 'blue',
    PURPLE = 'purple',
    BROWN = 'brown',
}

export const COLOR_BY_THEME = {
    [THEME.BLUE]: {
        primary: 'rgba(0, 243, 255, 1)',
        secondary: 'rgba(20, 24, 66, 1)',
        secondaryOpacity: 'rgba(20, 24, 66, 0.7)',
        tertiary: 'rgba(61, 63, 96, 1)',
        tertiaryOpacity: 'rgba(61, 63, 96, 0.6)',
        background: 'rgba(18, 18, 38, 1)',
    },

    [THEME.WHITE]: {
        primary: 'rgba(241, 241, 228, 1)',
        secondary: 'rgba(69, 70, 55, 1)',
        secondaryOpacity: 'rgba(69, 70, 55, 0.7)',
        tertiary: 'rgba(145, 147, 122, 1)',
        tertiaryOpacity: 'rgba(145, 147, 122, 0.6)',
        background: 'rgba(32, 32, 22, 1)',
    },

    [THEME.GREEN]: {
        primary: 'rgba(211, 242, 182, 1)',
        secondary: 'rgba(19, 47, 18, 1)',
        secondaryOpacity: 'rgba(19, 47, 18, 0.7)',
        tertiary: 'rgba(49, 81, 52, 1)',
        tertiaryOpacity: 'rgba(49, 81, 52, 0.6)',
        background: 'rgba(2, 28, 6, 1)',
    },

    [THEME.RED]: {
        primary: 'rgba(252, 198, 198, 1)',
        secondary: 'rgba(66, 24, 24, 1)',
        secondaryOpacity: 'rgba(66, 24, 24, 0.7)',
        tertiary: 'rgba(89, 3, 3, 1)',
        tertiaryOpacity: 'rgba(89, 3, 3, 0.6)',
        background: 'rgba(34, 2, 2, 1)',
    },

    [THEME.BLACK]: {
        primary: 'rgba(221, 216, 216, 1)',
        secondary: 'rgba(62, 62, 64, 1)',
        secondaryOpacity: 'rgba(62, 62, 64, 0.7)',
        tertiary: 'rgba(139, 132, 132, 1)',
        tertiaryOpacity: 'rgba(139, 132, 132, 0.6)',
        background: 'rgba(0, 0, 0, 1)',
    },

    [THEME.PURPLE]: {
        primary: 'rgba(255, 207, 250, 1)',
        secondary: 'rgba(69, 0, 72, 1)',
        secondaryOpacity: 'rgba(69, 0, 72, 0.7)',
        tertiary: 'rgba(94, 56, 96, 1)',
        tertiaryOpacity: 'rgba(94, 56, 96, 0.6)',
        background: 'rgba(43, 1, 40, 1)',
    },

    [THEME.BROWN]: {
        primary: 'rgba(246, 217, 148, 1)',
        secondary: 'rgba(117, 57, 3, 1)',
        secondaryOpacity: 'rgba(117, 57, 3, 0.7)',
        tertiary: 'rgba(200, 126, 73, 1)',
        tertiaryOpacity: 'rgba(200, 126, 73, 0.6)',
        background: 'rgba(40, 23, 1, 1)',
    },
}