import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeColors {
    primaryStd: string;
    primarySpec: string;
    secondary: string;
    tertiary: string,
    background: string,
    white: string;
    success: string;
    error: string;
}

const initialState: ThemeColors = {
    primaryStd: '#27E9FF',
    primarySpec: '#fc79efff',
    secondary: '#1f234eff',
    tertiary: '#2f336bff',
    background: '#21213aff',
    white: '#ffffffcc',
    success: '#21fc42ff',
    error: '#FA0505'

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