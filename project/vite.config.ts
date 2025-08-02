import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

/**
 * Configuración de Vite:
 * - Plugin React para JSX + Fast Refresh.
 * - Alias "@" que apunta a /src, para imports como "@/components/..."
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
