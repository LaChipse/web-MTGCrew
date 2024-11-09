import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { DEFAULT_PAGE_PATH } from '../../router/routes';
import Loading from '../Loading/Loading';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const encodedStateBeforeLeaving = sessionStorage.getItem('stateBeforeLeaving');
        const stateBeforeLeaving = encodedStateBeforeLeaving ? JSON.parse(encodedStateBeforeLeaving) as Record<string, unknown> : null;

        navigate(sessionStorage.getItem('currentPagePath') || DEFAULT_PAGE_PATH, { state: stateBeforeLeaving });

        sessionStorage.removeItem('currentPagePath');
        sessionStorage.removeItem('stateBeforeLeaving');
    }, [navigate]);

    return <Loading />;
};

export default Home;