import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // 🔥 Mise à jour automatique du SW
      devOptions: { enabled: true }, // Pour tester en dev
      manifest: {
        name: 'MTGT Crew',
        short_name: 'MTGCrew',
        description: 'MTG entre pote',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/mtgCrew_icon_192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/mtgCrew_icon_144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/mtgCrew_icon_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ],
        screenshots: [
          {
            src: '/screenshot.png',
            sizes: '640x320',
            type: 'image/png',
            label: 'Wonder Widgets'
          }
        ],
      },
      includeAssets: [
        'favicon.svg',
        'mtgCrew_icon_192.png',
        'mtgCrew_icon_144.png',
        'mtgCrew_icon_512.png',
        'screenshot.png',
      ],
    }),
  ],
  base: '/', // important pour Vercel
})
