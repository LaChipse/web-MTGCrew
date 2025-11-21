import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, useNavigate } from "react-router-dom";
import { useGetUser } from "../../hooks/queries/useGetUser";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loading from "../../pages/loader/Loading/Loading";
import { DEFAULT_PAGE_PATH, LOGIN_PAGE } from '../../router/routes';
import { authActions } from "../../store/reducers/authReducer";
import { setTheme } from "../../store/reducers/themeReducer";
import { RootState } from "../../store/store";
import { getThemes } from "../../utils/getThemes";

const AuthLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useAppSelector((state) => state.auth.user);
    const mode = useSelector((state: RootState) => state.type);
    const currentPagePath = sessionStorage.getItem('currentPagePath')
    
    useEffect(() => {
        if (user) {
            const theme = mode.isStandard ? user.colorStd : user.colorSpec;
            dispatch(setTheme(getThemes(theme)));
        }
    }, [user, mode, dispatch]);

    const { data: authUser, isLoading } = useGetUser();

    useEffect(() => {
        const handleLogin = () => {
            const token = localStorage.getItem('token');
            if (authUser) {
                dispatch(authActions.updateState(authUser));
            }

            if (token && (user || authUser)) {
                if (currentPagePath) {
                    navigate(currentPagePath);
                } else {
                    sessionStorage.setItem('currentPagePath', DEFAULT_PAGE_PATH);
                    navigate(DEFAULT_PAGE_PATH);
                }
            } else {
                navigate(LOGIN_PAGE);
            }
        };

        if (!user && !isLoading) handleLogin();
    }, [user, authUser, navigate, isLoading, dispatch, currentPagePath]);

    if (user) return <Outlet />;
    return <Loading />;
};

export default AuthLayout;