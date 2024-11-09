import { createSlice } from '@reduxjs/toolkit';

export interface Loadertate {
    isLoading: boolean
}

const initialState: Loadertate = {
    isLoading: true,
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        showLoader: (state) => {
            state.isLoading = true;
        },
        hideLoader: (state) => {
            state.isLoading = false;
        },
    },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export const loaderReducer = loaderSlice.reducer;