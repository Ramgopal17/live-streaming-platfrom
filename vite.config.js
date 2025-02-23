import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],



  server: {
    host: true, // Allows access via network
    port: 3000, // Optional, default is 5173
  }
})
