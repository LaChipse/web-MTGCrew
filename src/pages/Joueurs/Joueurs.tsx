import { useAppParams } from '../../hooks/useAppParams';

const Joueurs = () => {
    const { token } = useAppParams<{ token: string }>();
    console.log(token)

    return (
        <>
            <p>'JOUEURS !!!!!'</p>
        </>
    )
}

export default Joueurs