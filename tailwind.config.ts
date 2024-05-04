import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx}",
		"./src/shared/components/**/*.{js,ts,jsx,tsx}",
		"./src/shared/composables/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: "oklch(var(--background) / <alpha-value>)",
				foreground: "oklch(var(--foreground) / <alpha-value>)",
				elevated: "oklch(var(--elevated) / <alpha-value>)",
				highlight: "oklch(var(--highlight) / <alpha-value>)",
				primary: "oklch(var(--primary) / <alpha-value>)",
				"primary-foreground":
					"oklch(var(--primary-foreground) / <alpha-value>)",
			},
			textColor: {
				subdued: "oklch(var(--subdued) / <alpha-value>)",
				"bright-accent": "#1ed760",
				negative: "#f15e6c",
				warning: "#ffa42b",
				positive: "#1ed760",
				announcement: "#3d91f4",
			},
		},
	},
	plugins: [require("@tailwindcss/container-queries")],
};
export default config;
