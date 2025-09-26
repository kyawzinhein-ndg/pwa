import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // Enable PWA in dev for easy testing (open devtools > Application)
      devOptions: { enabled: true },

      includeAssets: [
        "icons/icon-192.png",
        "icons/icon-512.png",
        "icons/maskable-192.png",
        "icons/maskable-512.png",
        "favicon.svg",
        "apple-touch-icon.png"
      ],

      manifest: {
        id: "/",
        name: "My PWA App",
        short_name: "MyPWA",
        description: "A fast, native-feel mobile PWA.",
        start_url: "/home",
        scope: "/",
        display: "standalone",
        background_color: "#111111",
        theme_color: "#0ea5e9", // tailwind sky-500-ish
        orientation: "portrait",
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "icons/maskable-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "icons/maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },

      workbox: {
        // Precache & runtime caching
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,json}"],
        runtimeCaching: [
          // cache your JSON + images (shops + logos)
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/shops.json") ||
              url.pathname.startsWith("/images/"),
            handler: "CacheFirst",
            options: {
              cacheName: "content-cache",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: { cacheName: "static-resources" }
          }
        ]
      }
    })
  ]
});
