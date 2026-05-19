import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => {
  const standalone = mode === "single";

  return {
    plugins: [react(), standalone && viteSingleFile()].filter(Boolean),
    /** Relative paths so dist/ works from any folder or file:// */
    base: "./",
    build: standalone
      ? {
          outDir: "dist-standalone",
          emptyOutDir: true,
        }
      : undefined,
  };
});
