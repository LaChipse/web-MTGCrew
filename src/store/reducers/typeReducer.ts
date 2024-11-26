import { createSlice } from '@reduxjs/toolkit';

export interface typeState {
    isStandard: boolean
}

const initialState: typeState = {
    isStandard: true,
};

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        switchType: (state) => {
            state.isStandard = !state.isStandard;
        },
    },
});

export const { switchType } = typeSlice.actions;
export const typeReducer = typeSlice.reducer;