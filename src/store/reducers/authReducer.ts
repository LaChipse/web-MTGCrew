
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { TOKEN_VALIDATION_DURATION } from '../../constants/token';
import { DateHelper } from '../../utils/DateHelper';

export interface AuthUser {
    id: string
    nom: string
    prenom: string
    nbrDecks: number,
    partiesJouees: number,
    victoires: number,
}

export interface AuthState {
    user?: AuthUser
    tokenExpirationDate?: number
}

const initialState: AuthState = {
    user: undefined,
    tokenExpirationDate: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.tokenExpirationDate = DateHelper.addMinutes(new Date(), TOKEN_VALIDATION_DURATION).getTime();
        },
        updateTokenExpirationDate: (state) => {
            state.tokenExpirationDate = DateHelper.addMinutes(new Date(), TOKEN_VALIDATION_DURATION).getTime();
        },
    },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;