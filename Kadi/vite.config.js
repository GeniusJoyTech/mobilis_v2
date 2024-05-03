import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https:{
      key:'./cert/kadi-privateKey.key',
      cert:'./cert/kadi.crt',
    },
    host: '0.0.0.0',
    port: 5173
  }
})
