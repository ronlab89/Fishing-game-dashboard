import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/api-game\.bloque\.app\/game\/(leaderboard|market)$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 2, // Solo leaderboard y market
                maxAgeSeconds: 60 * 60 * 24, // 1 día
              },
            },
          },
        ],
      },
      manifest: {
        name: "Fishing Game Dashboard",
        short_name: "Leaderboard",
        description: "View top players and market items!",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "screenshot1.png",
            sizes: "540x720",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
});
