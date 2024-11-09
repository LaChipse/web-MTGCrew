import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { snackbarReducer } from './reducers/snackbarReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackbarReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch