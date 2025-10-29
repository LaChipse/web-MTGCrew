import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeColors {
    primaryStd: string;
    primarySpec: string;
    secondary: string;
    background: string,
    tertiary: string;
    text: string;
}

const initialState: ThemeColors = {
    primaryStd: '#27E9FF',
    primarySpec: '#F01EDB',
    secondary: '#0D0241',
    background: 'black',
    tertiary: '#2A047F',
    text: '#ffff',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeColors>) => {
        return { ...state, ...action.payload };
        },
    },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;