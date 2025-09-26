const CACHE_NAME = "my-pwa-cache-v2"; // bump version when updating cache
const OFFLINE_URL = "/offline.html";

// ✅ Install → Precache core files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        OFFLINE_URL,
        "/shops.json",
        "/",            // root
        "/index.html",  // entry point
      ])
    )
  );
  self.skipWaiting();
});

// ✅ Activate → cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ✅ Fetch handler
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Special: network-first for shops.json
  if (request.url.includes("/shops.json")) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, resClone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // HTML → App Shell style (NetworkFirst with offline fallback)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Others (CSS, JS, images) → CacheFirst
  event.respondWith(
    caches.match(request).then((cached) =>
      cached ||
      fetch(request).then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, resClone));
        return res;
      })
    )
  );
});

// ✅ Allow app to trigger "skip waiting" → instant update
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("⚡ Skipping waiting, activating new SW");
    self.skipWaiting();
  }
});
