import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import ProfilCard from './ProfilCard/ProfilCard';
import ProfilModal from './ProfilModal/ProfilModal';

const Profil = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <ProfilCard 
                user={user}
                handleOpen={handleOpen}
            />

            <ProfilModal 
                user={user}
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}

export default Profil