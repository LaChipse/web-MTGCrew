import { useMutation } from '@tanstack/react-query';
import { Api } from '../../utils/Api';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE } from '../../router/routes';
import { addSuccessSnackbar } from '../../store/reducers/snackbarReducer';
import { useDispatch } from 'react-redux';

const signup = (nom: string, prenom: string, password: string, ) => (
    new Api<{ token: string }>()
        .post('/auth/signup', {nom, prenom, password})
)

export const useSignup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return useMutation({
        mutationFn: (data: {nom: string, prenom: string, password: string}) => (
            signup(data.nom, data.prenom, data.password)
        ),
        onSuccess: () => {
            dispatch(addSuccessSnackbar('Compte créé !'))
            navigate(LOGIN_PAGE)
        }
    })

}
    