import { useQuery } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';

export interface CardByName {
    id: string,
    name: string,
    lang: string,
    imageUris?: Array<Record<'imageUrlSmall' | 'imageUrlNormal', string>>,
}

const getCardByName = async (search?: string) => {
    const filterParams = new URLSearchParams();
    filterParams.append('fuzzyName', String(search));

    return (
        await new Api<CardByName>()
            .get(`/deck/getCardByName?${filterParams}`)
    )
}

export const useGetCardByName = (search?: string) => (
    useQuery({
        queryKey: ['getCardByName', search],
        queryFn: () => getCardByName(search),
        enabled: !!search && search.length > 2,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnReconnect: true,  
    })
);