import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

import path from "path";

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
  resolve: {
    alias: {
      "@layouts": path.resolve(__dirname, "src/layouts/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@static": path.resolve(__dirname, "src/static/"),
    },
  },
  tools: {},
  plugins: [pluginReact()],
});
