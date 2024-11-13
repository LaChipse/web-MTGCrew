import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { TOKEN_REFRESH_THRESHOLD } from "../../constants/token";
import { useLogin } from "../../hooks/queries/useLogin";
import { useAppLocation } from "../../hooks/useAppLocation";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useTokenValidation } from "../../hooks/useTokenValidation";
import Login from "../../pages/Auth/Login/Login";
import Loading from "../../pages/Loading/Loading";
import { AUTH_PATH, LOGIN_PAGE } from '../../router/routes';


const AuthLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { refreshTokenIfNeeded } = useTokenValidation();
    
    const location = useAppLocation();
    const { error } = useLogin();
    const user = useAppSelector((state) => state.auth.user);

    const tokenExpirationDate = useAppSelector((state) => state.auth.tokenExpirationDate);

    useEffect(() => {
        const checkToken = () => refreshTokenIfNeeded(TOKEN_REFRESH_THRESHOLD);
    
        document.addEventListener('click', checkToken);
        return () => document.removeEventListener('click', checkToken);
    }, [dispatch, tokenExpirationDate, refreshTokenIfNeeded]);

    useEffect(() => {
        const redirectToAuthPage = (token: string) => {
            navigate(AUTH_PATH.replace(':token', btoa(token)));
        };

        const handleLogin = async () => {
            const token = localStorage.getItem('token')
    
            if (token) redirectToAuthPage(token)
            else navigate(LOGIN_PAGE);
        };

        if (!user || !tokenExpirationDate) {
            handleLogin()
        }
    }, [user, tokenExpirationDate, navigate, location.pathname]);

    if (error) return <Login />
    if (user) return <Outlet />;

    return <Loading />;
};

export default AuthLayout;