import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'minhtringuyen',
      project: 'javascript-react',
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3005,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3005,
    strictPort: true,
  },
})
