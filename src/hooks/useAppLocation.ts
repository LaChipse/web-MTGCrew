import { Location, useLocation } from 'react-router';

export const useAppLocation = <T = Record<string, unknown>>() => useLocation() as Location<Partial<T> | undefined>;