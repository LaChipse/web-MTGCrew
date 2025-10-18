import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface sortingGames {
    sortDate: 'desc' | 'asc' | undefined
    sortType: 'desc' | 'asc' | undefined
    sortTypeVictoire: 'desc' | 'asc' | undefined
    sortVictoire: 'desc' | 'asc' | undefined
}

const initialState: sortingGames = {
    sortDate: 'desc',
    sortType: undefined,
    sortTypeVictoire: undefined,
    sortVictoire: undefined,
};

const gameSortingSlice = createSlice({
    name: 'sortingGames',
    initialState,
    reducers: {
        setGameSorting: (state, action: PayloadAction<Partial<sortingGames>>) => {
            Object.assign(state, {
                sortDate: undefined,
                sortType: undefined,
                sortTypeVictoire: undefined,
                sortVictoire: undefined,
                ...action.payload
            });
        },
    },
});

export const { setGameSorting } = gameSortingSlice.actions;
export const gameSortingSliceReducer = gameSortingSlice.reducer;