import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { DEFAULT_PAGE_PATH } from '../../router/routes';
import Loading from '../Loading/Loading';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(DEFAULT_PAGE_PATH);

        sessionStorage.removeItem('currentPagePath');
    }, [navigate]);

    return <Loading />;
};

export default Home;