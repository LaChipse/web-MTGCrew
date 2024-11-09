import { useAppParams } from '../../hooks/useAppParams';

const Games = () => {
    const { token } = useAppParams<{ token: string }>();
    console.log(token)

    return (
        <>
            <p>'GAMES !!!!!'</p>
        </>
    )
}

export default Games