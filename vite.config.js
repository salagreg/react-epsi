import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Le site GitHub Pages est servi sous https://salagreg.github.io/react-epsi/
  base: '/react-epsi/',
})
