import { useParams } from 'react-router';

export const useAppParams = <T>() => useParams() as T;