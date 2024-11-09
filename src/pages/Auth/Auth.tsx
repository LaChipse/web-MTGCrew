import Loading from '../../pages/Loading/Loading';
import { HOME_PATH, LOGIN_PAGE } from '../../router/routes';
import { useAppLocation } from '../../hooks/useAppLocation';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { authActions } from '../../store/reducers/authReducer';
import { useEffect } from 'react';
import { useAppParams } from '../../hooks/useAppParams';
import { useGetAuthUser } from '../../hooks/queries/useGetAuthUser';

const Auth = () => {
    const location = useAppLocation<{ isInternalRedirect: boolean, redirect: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token } = useAppParams<{ token: string }>();
    const { data: user, error } = useGetAuthUser(atob(token));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', atob(token));
        }

        if (user) {
            dispatch(authActions.updateState({
                ...user,
            }));

            if (!location.state?.isInternalRedirect) {
                sessionStorage.removeItem('currentPagePath');
                sessionStorage.removeItem('stateBeforeLeaving');
            }

            navigate(HOME_PATH);
        }

        if (error && !user) navigate(LOGIN_PAGE)

    }, [user, error, token, navigate, dispatch, location.state]);

    return <Loading />;
};

export default Auth;