import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { snackbarReducer } from './reducers/snackbarReducer';
import { loaderReducer } from './reducers/loaderReducer';
import { typeReducer } from './reducers/typeReducer';
import { gameFiltersReducer } from './reducers/gameFiltersReducer';

export const store = configureStore({
    reducer: {
        loader: loaderReducer,
        auth: authReducer,
        snackbar: snackbarReducer,
        type: typeReducer,
        gameFilters: gameFiltersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch