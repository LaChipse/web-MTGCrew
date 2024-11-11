import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/queries/useLogin";
import { useAppLocation } from "../../hooks/useAppLocation";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loading from "../../pages/Loading/Loading";
import { useDispatch } from "react-redux";
import { useTokenValidation } from "../../hooks/useTokenValidation";
import { TOKEN_REFRESH_THRESHOLD } from "../../constants/token";
import { AUTH_PATH, LOGIN_PAGE } from '../../router/routes'
import { addErrorSnackbar } from "../../store/reducers/snackbarReducer";


const AuthLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useAppLocation();
    const { error } = useLogin();
    const user = useAppSelector((state) => state.auth.user);
    const { refreshTokenIfNeeded } = useTokenValidation();

    const tokenExpirationDate = useAppSelector((state) => state.auth.tokenExpirationDate);

    useEffect(() => {
        const checkToken = () => refreshTokenIfNeeded(TOKEN_REFRESH_THRESHOLD);
    
        document.addEventListener('click', checkToken);
        return () => document.removeEventListener('click', checkToken);
    }, [dispatch, tokenExpirationDate, refreshTokenIfNeeded]);

    

    useEffect(() => {
        const redirectToAuthPage = (token: string) => {
            navigate(AUTH_PATH.replace(':token', btoa(token)), { state: { isInternalRedirect: true, redirect: location.pathname } });
        };

        const handleLogin = async () => {
            const token = localStorage.getItem('token')
    
            if (token) redirectToAuthPage(token)
            else navigate(LOGIN_PAGE); // Your login URL
        };


        if (!user || !tokenExpirationDate) {
            handleLogin()
        }
    }, [user, tokenExpirationDate, navigate, location.pathname]);

    if (error) dispatch(addErrorSnackbar(`Erreur: ${error}`))
    if (user) return <Outlet />;

    return <Loading />;
};

export default AuthLayout;