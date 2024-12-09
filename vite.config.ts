// vite.config.js
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { loadEnv } from "vite"
import * as dotenv from "dotenv"

dotenv.config();
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': JSON.stringify(process.env), // Expose environment variables to the app
  },
  server: { open: true },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    mockReset: true,
  },
  build: {
    outDir: "dist", // Vercel serves from this directory by default
  },
})
