import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeColors {
    primary: string;
    secondary: string;
    secondaryOpacity: string,
    tertiary: string,
    tertiaryOpacity: string,
    background: string,
    white: string;
    black: string;
    success: string;
    error: string;
}

const initialState: ThemeColors = {
    primary: '#27E9FF',
    secondary: 'rgba(31, 35, 78, 1)',
    secondaryOpacity: 'rgba(31, 35, 78, 0.7)',
    tertiary: 'rgba(47, 51, 107, 1)',
    tertiaryOpacity: 'rgba(47, 51, 107, 0.7)',
    background: '#21213aff',
    white: '#ffffffcc',
    black: '#221e1eff',
    success: '#21fc42ff',
    error: '#FA0505',

};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Partial<ThemeColors>>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;