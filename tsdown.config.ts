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
		format: "esm",
		copy: ["src/onoffcanvas.css"],
		banner
	}
]);
