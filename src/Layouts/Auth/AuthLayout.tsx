import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppLocation } from "../../hooks/useAppLocation";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loading from "../../pages/Loading/Loading";
import { DEFAULT_PAGE_PATH, LOGIN_PAGE } from '../../router/routes';
import { useGetUser } from "../../hooks/queries/useGetUser";
import { authActions } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import Login from "../../pages/Auth/Login/Login";

const AuthLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useAppLocation();
    const user = useAppSelector((state) => state.auth.user);

    const { data: authUser } = useGetUser()

    useEffect(() => {
        const handleLogin = () => {
            const token = localStorage.getItem('token')

            if (authUser) {
                dispatch(authActions.updateState(
                    authUser,
                ));
            }

            if (token && (user || authUser)) navigate(DEFAULT_PAGE_PATH)
            else navigate(LOGIN_PAGE);
        };

        if (!user) {
            setTimeout(() => {
                handleLogin()
            }, 2000)
        }
    }, [user, navigate, dispatch, authUser, location.pathname]);

    if (user) return <Outlet />;
    return <Login />;
};

export default AuthLayout;