import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../../utils/Api';
import { useGetAllPlayers } from './useGetAllPlayers';

const updateUser = (nom: string, prenom: string, password?: string, ) => (
    new Api<{ token: string }>()
        .setBearerToken()
        .put('/user/update', {nom, prenom, password})
)

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return (
        useMutation({
            mutationFn: (data: {nom: string, prenom: string, password?: string}) => (
                updateUser(data.nom, data.prenom, data.password)
            ),
            onSuccess: () => {
                useGetAllPlayers.reset(queryClient)
            }
        })
    )
}