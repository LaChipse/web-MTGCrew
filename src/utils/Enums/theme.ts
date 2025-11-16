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
        primary: 'rgba(39, 233, 255, 1)',
        secondary: 'rgba(31, 35, 78, 1)',
        secondaryOpacity: 'rgba(31, 35, 78, 0.7)',
        tertiary: 'rgba(56, 60, 128, 1)',
        tertiaryOpacity: 'rgba(56, 60, 128, 0.6)',
        background: 'rgba(23, 23, 48, 1)',
    },

    [THEME.WHITE]: {
        primary: 'rgba(241, 241, 228, 1)',
        secondary: 'rgba(141, 142, 109, 1)',
        secondaryOpacity: 'rgba(141, 142, 109, 0.7)',
        tertiary: 'rgba(243, 246, 208, 1)',
        tertiaryOpacity: 'rgba(243, 246, 208, 0.6)',
        background: 'rgba(45, 46, 4, 1)',
    },

    [THEME.GREEN]: {
        primary: 'rgba(187, 245, 132, 1)',
        secondary: 'rgba(19, 82, 17, 1)',
        secondaryOpacity: 'rgba(19, 82, 17, 0.7)',
        tertiary: 'rgba(53, 114, 59, 1)',
        tertiaryOpacity: 'rgba(53, 114, 59, 0.6)',
        background: 'rgba(7, 37, 12, 1)',
    },

    [THEME.RED]: {
        primary: 'rgba(252, 198, 198, 1)',
        secondary: 'rgba(97, 12, 31, 1)',
        secondaryOpacity: 'rgba(97, 12, 31, 0.7)',
        tertiary: 'rgba(204, 32, 32, 1)',
        tertiaryOpacity: 'rgba(204, 32, 32, 0.6)',
        background: 'rgba(37, 7, 7, 1)',
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
        primary: 'rgba(252, 196, 247, 1)',
        secondary: 'rgba(100, 6, 104, 1)',
        secondaryOpacity: 'rgba(100, 6, 104, 0.7)',
        tertiary: 'rgba(175, 86, 178, 1)',
        tertiaryOpacity: 'rgba(175, 86, 178, 0.6)',
        background: 'rgba(48, 1, 45, 1)',
    },

    [THEME.BROWN]: {
        primary: 'rgba(255, 230, 0, 1)',
        secondary: 'rgba(151, 72, 2, 1)',
        secondaryOpacity: 'rgba(151, 72, 2, 0.7)',
        tertiary: 'rgba(217, 139, 83, 1)',
        tertiaryOpacity: 'rgba(217, 139, 83, 0.6)',
        background: 'rgba(48, 1, 45, 1)',
    },
}