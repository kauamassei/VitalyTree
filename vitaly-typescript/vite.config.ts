import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Permite conexões de qualquer dispositivo na rede local
    port: 5173,  // Ou qualquer outra porta que você preferir
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src")}]
  },
})
