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
				"main-primary": "#121212",
				"main-highlight": "#1a1a1a",
				"main-press": "#000",
				"main-elevated-primary": "#242424",
				"main-elevated-highlight": "#2a2a2a",
				"main-elevated-press": "#000",
				"main-tinted-primary": "hsla(0,0%,100%,.07)",
				"main-tinted-highlight": "hsla(0,0%,100%,.1)",
				"main-tinted-press": "hsla(0,0%,100%,.04)",
				"main-unsafe-for-small-text-primary": "#121212",
				"main-unsafe-for-small-text-highlight": "#121212",
				"main-unsafe-for-small-text-press": "#121212",
				"main-essential-primary": "#fff",
				"main-essential-subdued": "#727272",
				"main-essential-bright-accent": "#1ed760",
				"main-essential-negative": "#e91429",
				"main-essential-warning": "#ffa42b",
				"main-essential-positive": "#1ed760",
				"main-essential-announcement": "#0d72ea",
				"main-decorative-primary": "#fff",
				"main-decorative-subdued": "#292929",
				"main-essential-announcement-secondary": "#000",
				"main-essential-secondary": "#000",
				"main-essential-bright-accent-secondary": "#17a449",
				"main-essential-negative-secondary": "#000",
				"main-essential-positive-secondary": "#000",
				"main-essential-subdued-secondary": "#8f8f8f",
				"main-essential-warning-secondary": "#000",
				"main-decorative-secondary": "#000",
				"main-decorative-subdued-secondary": "#dedede",
				"darken-50": "rgba(0,0,0,.5)",
				"darken-40": "rgba(0,0,0,.4)",
			},
			backgroundColor: {
				primary: "#fff",
				main: "#000",
				highlight: "#f6f6f6",
				press: "#b7b7b7",
				"elevated-primary": "#fff",
				"elevated-highlight": "#fff",
				"elevated-press": "#fff",
				"tinted-primary": "#fff",
				"tinted-highlight": "#fff",
				"tinted-press": "#fff",
				"unsafe-for-small-text-primary": "#fff",
				"unsafe-for-small-text-highlight": "#fff",
				"unsafe-for-small-text-press": "#fff",
				secondary: "#121212",
				"highlight-secondary": "#1a1a1a",
				"press-secondary": "#000",
				"elevated-secondary": "#242424",
				"elevated-highlight-secondary": "#2a2a2a",
				"elevated-press-secondary": "#000",
				"tinted-secondary": "hsla(0,0%,100%,.07)",
				"tinted-highlight-secondary": "hsla(0,0%,100%,.1)",
				"tinted-press-secondary": "hsla(0,0%,100%,.04)",
				"unsafe-for-small-text-secondary": "#121212",
				"unsafe-for-small-text-highlight-secondary": "#121212",
				"unsafe-for-small-text-press-secondary": "#121212",
				"card-primary": "#181818",
				"card-highlight": "#282828",
			},
			textColor: {
				primary: "#fff",
				subdued: "#a7a7a7",
				"bright-accent": "#1ed760",
				negative: "#f15e6c",
				warning: "#ffa42b",
				positive: "#1ed760",
				announcement: "#3d91f4",
				"announcement-secondary": "#000",
				secondary: "#000",
				"bright-accent-secondary": "#12833a",
				"negative-secondary": "#000",
				"positive-secondary": "#000",
				"subdued-secondary": "#5e5e5e",
				"warning-secondary": "#000",
			},
		},
	},
	plugins: [require("@tailwindcss/container-queries")],
};
export default config;
