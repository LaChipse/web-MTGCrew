import { COLOR_BY_THEME, THEME } from "./Enums/theme";

export const getTheme = (theme: THEME) => {
    return {
        primary: COLOR_BY_THEME[theme].primary,
        secondary: COLOR_BY_THEME[theme].secondary,
        secondaryOpacity: COLOR_BY_THEME[theme].secondaryOpacity,
        secondaryRow: COLOR_BY_THEME[theme].secondaryRow,
        tertiary: COLOR_BY_THEME[theme].tertiary,
        tertiaryOpacity: COLOR_BY_THEME[theme].tertiaryOpacity,
        tertiaryRow: COLOR_BY_THEME[theme].tertiaryRow,
        background: COLOR_BY_THEME[theme].background,
    }

}