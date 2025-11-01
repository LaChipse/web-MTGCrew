import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dayjs } from 'dayjs';
import { ROLE_TYPE } from '../../utils/Enums/roleType';
import { TYPE_VICTORY } from '../../utils/Enums/victoryType';

export interface filtersGames {
    startDate: Dayjs | null,
    endDate: Dayjs | null,
    victoryRole?: ROLE_TYPE | '',
    winnerId?: string | '',
    typeOfVictory?: TYPE_VICTORY | '',
}

const initialState: filtersGames = {
    startDate: null,
    endDate: null,
    victoryRole: '',
    winnerId: '',
    typeOfVictory: ''
};

const gameFiltersSlice = createSlice({
    name: 'filtersGames',
    initialState,
    reducers: {
        setStartDate: (state, action: PayloadAction<Dayjs | null>) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action: PayloadAction<Dayjs | null>) => {
            state.endDate = action.payload;
        },
        setVictoryRole: (state, action: PayloadAction<ROLE_TYPE | ''>) => {
            state.victoryRole = action.payload;
        },
        setWinnerId: (state, action: PayloadAction<string | ''>) => {
            state.winnerId = action.payload;
        },
        setTypeOfVictory: (state, action: PayloadAction<TYPE_VICTORY | ''>) => {
            state.typeOfVictory = action.payload;
        },
        clearGameFiltersState: () => initialState
    },
});

export const { setStartDate, setEndDate, setTypeOfVictory, setVictoryRole, setWinnerId, clearGameFiltersState } = gameFiltersSlice.actions;
export const gameFiltersReducer = gameFiltersSlice.reducer;