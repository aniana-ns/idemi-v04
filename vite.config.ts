import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Using relative base path makes the build portable to any subdirectory on GitHub Pages
  base: "./",
  build: {
    outDir: "dist",
  },
});
