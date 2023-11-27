import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// const env = loadEnv(mode, process.cwd(), '')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
