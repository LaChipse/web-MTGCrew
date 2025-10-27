import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { registerSW } from 'virtual:pwa-register'
import "./index.css";

const updateSW = registerSW({
  onNeedRefresh() {
    // Recharge automatiquement quand une nouvelle version est dispo
    updateSW(true)
  },
  onOfflineReady() {
    console.log('✅ L’app est prête à fonctionner hors ligne')
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>
);