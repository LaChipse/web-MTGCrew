
import { authActions } from '../store/reducers/authReducer';
import { DateHelper } from '../utils/DateHelper';
// import { useRefreshToken } from './queries/useRefreshToken';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useTokenValidation = () => {
    const tokenExpirationDate = useAppSelector((state) => state.auth.tokenExpirationDate);
    // const refreshToken = useRefreshToken();
    const dispatch = useAppDispatch();

    return {
        /**
         * Rafraichit le jeton d'authentification si la durée de validité est inférieure à `tokenRefreshThreshold`.
         * @param tokenRefreshThreshold Durée en minutes à partir de laquelle le jeton d'authentification doit être rafraichit
         */
        async refreshTokenIfNeeded(tokenRefreshThreshold: number) {
            if (!tokenExpirationDate) return;
            if (tokenExpirationDate > DateHelper.addMinutes(new Date(), tokenRefreshThreshold).getTime()) return;

            const token = localStorage.getItem('token');

            if (token) localStorage.setItem('token', token);
            dispatch(authActions.updateTokenExpirationDate());
        }
    };
};