import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const isApp = mode === "app";
  const isLib = mode === 'lib';

  return {
    base: '/onoffcanvas/',
    plugins: [tailwindcss()],
    publicDir: isLib ? false : 'public',
    build: isApp
      ? {
        // App build for GitHub Pages
        outDir: "dist",
      }
      : {
        // Library build for NPM
        outDir: "lib",
        lib: {
          entry: "./src/index.ts",
          name: "Onoffcanvas",
          fileName: "onoffcanvas",
          formats: ["es", "umd"],
        },
        rollupOptions: {
          output: {
            exports: "named",
          },
        },
      },
  };
});
