const CACHE_NAME = "monapp-cache-v1";

self.addEventListener("install", (event) => {
    console.log("[Service Worker] Install");
    self.skipWaiting(); // active immédiatement la nouvelle version
});

self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activate");
    event.waitUntil(
        caches.keys().then((cacheNames) =>
        Promise.all(
            cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
                console.log("[Service Worker] Deleting old cache:", name);
                return caches.delete(name);
            }
            })
        )
        )
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((response) => {
            const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
                if (event.request.url.startsWith(self.location.origin)) {
                cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            })
            .catch(() => response);
            return response || fetchPromise;
        })
        )
    );
});
