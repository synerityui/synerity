import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point directly at UI source so Vite handles CSS Modules natively.
      // The built dist uses esbuild which can't generate default CSS module exports;
      // Vite's native CSS Modules processor works correctly out of the box.
      "@synerity/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
  optimizeDeps: {
    exclude: ["@synerity/ui"],
  },
});
