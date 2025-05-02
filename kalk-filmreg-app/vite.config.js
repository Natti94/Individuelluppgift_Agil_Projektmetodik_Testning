import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/token-service": {
        target: "https://tokenservice-jwt-2025.fly.dev",
        changeOrigin: true,
        secure: false,
      },
      "/movies": {
        target: "https://tokenservice-jwt-2025.fly.dev",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    reporter: "verbose", 
  },
});
