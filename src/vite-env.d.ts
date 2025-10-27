/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
}

declare module 'virtual:pwa-register/react' {
    export interface RegisterSWOptions {
        immediate?: boolean
        onNeedRefresh?: () => void
        onOfflineReady?: () => void
    }

    export function useRegisterSW(options?: RegisterSWOptions): {
        needRefresh: [boolean, (v: boolean) => void]
        offlineReady: [boolean, (v: boolean) => void]
        updateServiceWorker: (reloadPage?: boolean) => Promise<void>
    }
}
