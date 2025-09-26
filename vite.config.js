// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "icons/*"],
      manifest: {
        name: "MPSD - Myanmar Phone Service Directory",
        short_name: "MPSD",
        description: "Myanmar Phone Service Directory",
        theme_color: "#0ea5e9",
        background_color: "#0ea5e9",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "app-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    port: 5173,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173
    }
  }
});
