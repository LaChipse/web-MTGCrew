import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SnackbarType = 'success' | 'info' | 'error'

export interface SnackbarState {
    isVisible: boolean
    message?: string | Array<string>
    type?: SnackbarType
}

const initialState: SnackbarState = {
    isVisible: false,
};

const themeSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        addSuccessSnackbar: (state, action: PayloadAction<string | Array<string>>) => {
            state.isVisible = true;
            state.message = action.payload;
            state.type = 'success';
        },
        addInfoSnackbar: (state, action: PayloadAction<string | Array<string>>) => {
            state.isVisible = true;
            state.message = action.payload;
            state.type = 'info';
        },
        addErrorSnackbar: (state, action: PayloadAction<string | Array<string>>) => {
            state.isVisible = true;
            state.message = action.payload;
            state.type = 'error';
        },
        clearSnackbar: (state) => {
            state.isVisible = false;
        },
    },
});

export const { addSuccessSnackbar, addInfoSnackbar, addErrorSnackbar, clearSnackbar } = themeSlice.actions;
export const snackbarReducer = themeSlice.reducer;