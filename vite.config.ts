import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate', // Le service worker sera mis à jour automatiquement
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'], // Ajouter des assets supplémentaires ici
      manifest: {
        name: 'MTGT Crew',
        short_name: 'MTGCrew',
        description: 'MTG entre pote',
        start_url: "/",
        display: "standalone",        // C'est un point clé pour le mode d'affichage
        background_color: "#ffffff",
        theme_color: '#ffffff',
        screenshots: [
          {
            src: "/screenshot.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
            label: "Wonder Widgets"
          },
          {
            src: "/screenshot.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "narrow",
            label: "Wonder Widgets"
          }
        ],
        icons: [
          {
            src: '/mtgCrew_icon_192.png', // L'icône de l'application
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/mtgCrew_icon_512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})