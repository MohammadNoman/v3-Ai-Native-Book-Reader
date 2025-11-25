import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

import mdx from '@mdx-js/rollup';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      { enforce: 'pre', ...mdx() },
      react()
    ],
    define: {
      // Use VITE_ prefix for client-side environment variables
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate React vendor bundle for better caching
            'react-vendor': ['react', 'react-dom'],
            // Separate MDX vendor bundle
            'mdx-vendor': ['@mdx-js/react'],
          },
        },
      },
      // Increase chunk size warning limit since we're using lazy loading
      chunkSizeWarningLimit: 600,
    }
  };
});
