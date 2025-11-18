import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeColors {
    primary: string;
    secondary: string;
    secondaryOpacity: string,
    secondaryRow: string,
    tertiary: string,
    tertiaryOpacity: string,
    tertiaryRow: string,
    background: string,
    white: string;
    black: string;
    success: string;
    error: string;
}

const initialState: ThemeColors = {
    primary: 'rgba(85, 246, 255, 1)',
    secondary: 'rgba(20, 24, 66, 1)',
    secondaryOpacity: 'rgba(20, 24, 66, 0.7)',
    secondaryRow: 'rgba(20, 24, 66, 0.1)',
    tertiary: 'rgba(54, 58, 117, 1)',
    tertiaryOpacity: 'rgba(54, 58, 117, 0.6)',
    tertiaryRow: 'rgba(54, 58, 117, 0.1)',
    background: 'rgba(18, 18, 38, 1)',
    white: '#ffffffff',
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