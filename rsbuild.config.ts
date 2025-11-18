import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

import path from "path";

const { publicVars, rawPublicVars } = loadEnv({ prefixes: ['REACT_APP_'] })
export default defineConfig({
  html: {
    template: path.resolve(__dirname, 'public', 'index.html'),
    title: "Tuấn - Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn",
    favicon: "./src/favicon.ico",
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
      "@hooks": path.resolve(__dirname, "src/hooks/"),
    },
  },
  tools: {},
  plugins: [pluginReact()],
});
