import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Chemins relatifs : l'app fonctionne sur GitHub Pages (sous /react-epsi/) avec le HashRouter.
  base: './',
})
