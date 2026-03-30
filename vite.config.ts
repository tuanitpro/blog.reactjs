import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@layouts": path.resolve(__dirname, "src/layouts/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@static": path.resolve(__dirname, "src/static/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@app-types": path.resolve(__dirname, "src/types/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  assetsInclude: ["**/*.lottie"],
});
