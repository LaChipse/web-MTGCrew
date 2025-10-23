import { Button } from '@mui/material'
import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdateBanner() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW()

    if (!needRefresh) return null

    const handleUpdateServiceWorker = () => {
        updateServiceWorker(true)
        setNeedRefresh(false)
    }

    return (
        <div>
            {!needRefresh && (
                <Button onClick={handleUpdateServiceWorker}>
                    Mettre à jour
                </Button>
            )}
        </div>
    )
}
