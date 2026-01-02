import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy API requests to the backend server
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/health': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, "server/dist"), // Build to server/dist so the Express server can serve it
    emptyOutDir: true, // Remove previous build files
    rollupOptions: {
      external: [
        'canvg',
        'html2canvas',
        'dompurify',
      ],
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Handle jsPDF optional dependencies properly
    dedupe: ['core-js', 'canvg', 'html2canvas', 'dompurify'],
  },
  optimizeDeps: {
    exclude: [
      'canvg',
      'html2canvas',
      'dompurify',
    ],
  },
}));