import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => {
  const standalone = mode === "single";
  /** `./` for local/offline; `/Bubble-StudyHub/` for GitHub Pages (set in CI). */
  const base = process.env.VITE_BASE_PATH ?? "./";

  return {
    plugins: [react(), standalone && viteSingleFile()].filter(Boolean),
    base,
    build: standalone
      ? {
          outDir: "dist-standalone",
          emptyOutDir: true,
        }
      : undefined,
  };
});
