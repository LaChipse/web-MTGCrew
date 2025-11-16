
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { THEME } from '../../utils/Enums/theme';

export interface PartiesTypes {
    standard: number,
    special: number
}

export interface AuthUser {
    id: string
    nom: string
    prenom: string
    nbrDecks: number,
    partiesJouees: PartiesTypes,
    victoires: PartiesTypes,
    colorStd: THEME,
    colorSpec: THEME,
}

export interface AuthState {
    user?: AuthUser
}

const initialState: AuthState = {
    user: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;