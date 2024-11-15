import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUser } from "../../hooks/queries/useGetUser";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loading from "../../pages/Loading/Loading";
import { DEFAULT_PAGE_PATH, LOGIN_PAGE } from '../../router/routes';
import { authActions } from "../../store/reducers/authReducer";

const AuthLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useAppSelector((state) => state.auth.user);
    const currentPagePath = sessionStorage.getItem('currentPagePath')

    const { data: authUser } = useGetUser()

    useEffect(() => {
        const handleLogin = () => {
            const token = localStorage.getItem('token')

            if (authUser) {
                dispatch(authActions.updateState(
                    authUser,
                ));
            }

            if (token && (user || authUser)) {
                
                if (currentPagePath) {
                    navigate(currentPagePath)
                } else {
                    sessionStorage.setItem('currentPagePath', DEFAULT_PAGE_PATH)
                    navigate(DEFAULT_PAGE_PATH)
                }
            } else navigate(LOGIN_PAGE);
        };

        if (!user) {
            setTimeout(() => {
                handleLogin()
            }, 2000)
        }
    }, [user, navigate, dispatch, authUser, currentPagePath]);

    if (user) return <Outlet />;
    return <Loading />;
};

export default AuthLayout;