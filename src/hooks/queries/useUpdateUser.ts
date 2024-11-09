import { useMutation } from '@tanstack/react-query';
import { Api } from '../../utils/Api';

const updateUser = (nom: string, prenom: string, password?: string, ) => (
    new Api<{ token: string }>()
        .setBearerToken()
        .put('/user/update', {nom, prenom, password})
)

export const useUpdateUser = () => (
    useMutation({
        mutationFn: (data: {nom: string, prenom: string, password?: string}) => (
            updateUser(data.nom, data.prenom, data.password)
        ),
    })
);