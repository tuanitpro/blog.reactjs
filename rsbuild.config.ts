import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

import path from "path";

const { publicVars, rawPublicVars } = loadEnv({ prefixes: ['REACT_APP_'] })
export default defineConfig({
  html: {
    title: "Tuấn - Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn",
    favicon: "./src/favicon.ico",
    meta: {
      charset: {
        charset: "UTF-8",
      },
      viewport: "width=device-width, initial-scale=1.0",
    },
  },
  source: {
    define: {
      ...publicVars,
      'process.env': JSON.stringify(rawPublicVars),
    },
    assetsInclude: /\.lottie$/,
  },
  resolve: {
    alias: {
      process: 'process/browser',
      "@layouts": path.resolve(__dirname, "src/layouts/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@static": path.resolve(__dirname, "src/static/"),
    },
  },
  tools: {},
  plugins: [pluginReact()],
});
