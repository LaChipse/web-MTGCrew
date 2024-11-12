import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAuthUser } from '../../hooks/queries/useGetAuthUser';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppParams } from '../../hooks/useAppParams';
import Loading from '../../pages/Loading/Loading';
import { HOME_PATH, LOGIN_PAGE } from '../../router/routes';
import { authActions } from '../../store/reducers/authReducer';
import { useAppLocation } from '../../hooks/useAppLocation';

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

            navigate(location.state?.redirect || HOME_PATH);
        }

        if ((error && !user) || !token) navigate(LOGIN_PAGE)

    }, [user, error, token, navigate, dispatch, location.state]);

    return <Loading />;
};

export default Auth;