import { useEffect, useState } from "react";

export function useAppVersionChecker(intervalMs = 60000) {
    const [hasUpdate, setHasUpdate] = useState(false);
    const [latestVersion, setLatestVersion] = useState<string | null>(null);

    useEffect(() => {
        const currentVersion = import.meta.env.VITE_APP_VERSION;

        const checkVersion = async () => {
        try {
            const res = await fetch("/version.json", { cache: "no-cache" });
            const data = await res.json();
            const newVersion = data.version;

            if (newVersion && newVersion !== currentVersion) {
            setHasUpdate(true);
            setLatestVersion(newVersion);
            }
        } catch (err) {
            console.error("Erreur de vérification de version:", err);
        }
        };

        checkVersion();
        const interval = setInterval(checkVersion, intervalMs);
        return () => clearInterval(interval);
    }, [intervalMs]);

    return { hasUpdate, latestVersion };
}
