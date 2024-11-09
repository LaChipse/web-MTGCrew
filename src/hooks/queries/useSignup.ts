import { useMutation } from '@tanstack/react-query';
import { Api } from '../../utils/Api';

const signup = (nom: string, prenom: string, password: string, ) => (
    new Api<{ token: string }>()
        .post('/auth/signup', {nom, prenom, password})
)

export const useSignup = () => (
    useMutation({
        mutationFn: (data: {nom: string, prenom: string, password: string}) => (
            signup(data.nom, data.prenom, data.password)
        ),
        onSuccess: () => {
            window.location.href = 'http://localhost:3000/login'
        }
    })
);