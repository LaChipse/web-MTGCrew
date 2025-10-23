import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: 'src',
      outDir: 'dist',
      strategies: 'generateSW',
      registerType: 'autoUpdate', // ⚡ mise à jour automatique
      devOptions: {
        enabled: true, // utile pour tester en local
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,wasm,ico,png,svg}'],
        globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
      },
      manifest: {
        name: "MTGT Crew",
        short_name: "MTGCrew",
        description: "MTG entre pote",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/mtgCrew_icon_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/mtgCrew_icon_512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
})
