
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../store/reducers/loaderReducer';

type Props = unknown

const Loading: React.FC<Props> = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoader());

        return () => {
            dispatch(hideLoader());
        };
    }, [dispatch]);

    return null;
};

export default Loading;