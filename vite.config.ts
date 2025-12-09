import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

export default defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/lib/paraglide",
			strategy: ["localStorage", "preferredLanguage", "baseLocale"]
		}),
		sveltekit()
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},
	server: {
		allowedHosts: true
	}
});
