import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

type Props = unknown

const PagePathStorageLayout: React.FC<Props> = () => {
    const location = useLocation();

    useEffect(() => {
        sessionStorage.setItem('currentPagePath', location.pathname);
    }, [location.pathname]);

    return <Outlet />;
};

export default PagePathStorageLayout;