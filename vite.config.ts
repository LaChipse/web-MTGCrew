import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'mtgCrew_icon_192.png', "mtgCrew_icon_512.png", "screenshot.png"], 
      manifest: {
        name: "MTGT Crew",
        short_name: "MTGCrew",
        description: "MTG entre pote",
        start_url: "/",
        id: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
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
            src: "/mtgCrew_icon_192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/mtgCrew_icon_512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
      },
    })
  ],
})