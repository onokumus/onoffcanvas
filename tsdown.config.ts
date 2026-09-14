import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

const banner = `/*!
* ${pkg.name} - v${pkg.version}
* ${pkg.description}
* ${pkg.homepage}
*
* Made by ${pkg.author}
* Under ${pkg.license} License
*/`;

export default defineConfig([
    {
        dts: {
            generator: "tsgo",
        },
        entry: "src/index.ts",
        format: "esm",
        banner,
        clean: true,
    },
    {
        dts: false,
        entry: "src/onoffcanvas.ts",
        globalName: "OnoffCanvas",
        format: "iife",
        banner,
        clean: false,
        minify: true,
        sourcemap: true,
        copy: ["src/onoffcanvas.css"],
        outputOptions: {
            entryFileNames: "onoffcanvas.js",
        },
    },
]);
