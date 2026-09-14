import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	root: "website",
	publicDir: "../public",
	base: "/onoffcanvas/",
	plugins: [tailwindcss()],
	build: {
		outDir: "../docs",
	},
});
