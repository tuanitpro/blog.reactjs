/* eslint-disable no-undef */
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    assetsInclude: ['**/*.lottie'],
    envPrefix: ['VITE_', 'REACT_APP_'],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        "@layouts": path.resolve(__dirname, "src/layouts/"),
        "@components": path.resolve(__dirname, "src/components/"),
        "@static": path.resolve(__dirname, "src/static/"),
        "@hooks": path.resolve(__dirname, "src/hooks/"),
        "@app-types": path.resolve(__dirname, "src/types/"),
        "@utils": path.resolve(__dirname, "src/utils/"),
        "@lib": path.resolve(__dirname, "src/lib/"),
        "@contexts": path.resolve(__dirname, "src/contexts/"),
      },
    },
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: true,
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
