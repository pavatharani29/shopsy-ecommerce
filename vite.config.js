import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes the built site work from any URL path:
// GitHub Pages (/shopsy-ecommerce/), a custom domain, or localhost.
export default defineConfig({
  plugins: [react()],
  base: './',
})
