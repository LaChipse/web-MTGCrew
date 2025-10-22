import { addErrorSnackbar } from '../store/reducers/snackbarReducer';
import { AppDispatch } from '../store/store';
import { ApiException } from '../utils/ApiException';
import { useAppDispatch } from './useAppDispatch';

const handleUnknownError = (dispatch: AppDispatch) => {
    dispatch(addErrorSnackbar('Une erreur est apparue'));
};

const handleError400 = (dispatch: AppDispatch, message?: string) => {
    dispatch(addErrorSnackbar(message ? message : 'Erreur inconnue'));
};

const handleError401 = (dispatch: AppDispatch,  message?: string) => {
    dispatch(addErrorSnackbar(message ? message : 'Vous êtes déconnecté'));
    document.location.reload();
};

const handleError403 = (dispatch: AppDispatch,  message?: string) => {
    dispatch(addErrorSnackbar(message ? message : 'Accés refusé'));
};

const handleError404 = (dispatch: AppDispatch,  message?: string) => {
    dispatch(addErrorSnackbar(message ? message : 'Element introuvable'));
};

const handleError422 = (dispatch: AppDispatch,  message?: string) => {
    dispatch(addErrorSnackbar(message ? message : 'Données envoyées invalides'));
};

export const useQueryErrorHandler = () => {
    const dispatch = useAppDispatch();

    return (error: unknown) => {
        if (!(error instanceof ApiException)) {
            handleUnknownError(dispatch);
            return;
        }

        if (error.isDefaultErrorHandlerIgnored) return;

        switch (error.status) {
            case 400:
                handleError400(dispatch, error.body);
                break;
            case 401:
                handleError401(dispatch, error.body);
                break;
            case 403:
                handleError403(dispatch, error.body);
                break;
            case 404:
                handleError404(dispatch, error.body);
                break;
            case 422:
                handleError422(dispatch, error.body);
                break;
            default:
                handleUnknownError(dispatch);
                break;
        }
    };
};
