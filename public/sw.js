const CACHE_NAME = 'lushride-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/logo.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Return cached response but try to fetch update in background
        fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok && event.request.url.startsWith('http')) {
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse);
                });
            }
        }).catch(() => {});
        return response;
      }
      
      // If not in cache, go to network network
      return fetch(event.request).then(networkResponse => {
         if (networkResponse.ok && event.request.url.startsWith('http')) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseClone);
            });
         }
         return networkResponse;
      }).catch(() => {
         // Offline fallback if needed
      });
    })
  );
});
