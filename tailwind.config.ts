/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: "'Geist', sans-serif",
				mono: "'Geist Mono', monospace",
			},
			colors: {
				warning: "#FF523b",
				background: {
					DEFAULT: "oklch(0.99 0 0)",
					dark: "oklch(0.08 0 0)",
				},
				foreground: {
					DEFAULT: "oklch(0.15 0 0)",
					dark: "oklch(0.95 0 0)",
				},
				card: {
					DEFAULT: "oklch(1 0 0)",
					dark: "oklch(0.1 0 0)",
				},
				"card-foreground": {
					DEFAULT: "oklch(0.15 0 0)",
					dark: "oklch(0.95 0 0)",
				},
				popover: {
					DEFAULT: "oklch(1 0 0)",
					dark: "oklch(0.1 0 0)",
				},
				"popover-foreground": {
					DEFAULT: "oklch(0.15 0 0)",
					dark: "oklch(0.95 0 0)",
				},
				primary: {
					DEFAULT: "#008080",
					dark: "#008080",
				},
				"primary-foreground": {
					DEFAULT: "oklch(1 0 0)",
					dark: "oklch(0.05 0 0)",
				},
				secondary: {
					DEFAULT: "oklch(0.96 0 0)",
					dark: "oklch(0.15 0 0)",
				},
				"secondary-foreground": {
					DEFAULT: "oklch(0.15 0 0)",
					dark: "oklch(0.95 0 0)",
				},
				muted: {
					DEFAULT: "oklch(0.96 0 0)",
					dark: "oklch(0.15 0 0)",
				},
				"muted-foreground": {
					DEFAULT: "oklch(0.45 0 0)",
					dark: "oklch(0.6 0 0)",
				},
				accent: {
					DEFAULT: "oklch(0.96 0 0)",
					dark: "oklch(0.15 0 0)",
				},
				"accent-foreground": {
					DEFAULT: "oklch(0.15 0 0)",
					dark: "oklch(0.95 0 0)",
				},
				destructive: {
					DEFAULT: "oklch(0.65 0.2 25)",
					dark: "oklch(0.6 0.2 25)",
				},
				"destructive-foreground": {
					DEFAULT: "oklch(1 0 0)",
					dark: "oklch(0.95 0 0)",
				},
				border: {
					DEFAULT: "oklch(0.9 0 0)",
					dark: "oklch(0.15 0 0)",
				},
				input: {
					DEFAULT: "oklch(0.9 0 0)",
					dark: "oklch(0.15 0 0)",
				},
				ring: {
					DEFAULT: "oklch(0.52 0.14 185)",
					dark: "oklch(0.58 0.14 185)",
				},
				"chart-1": {
					DEFAULT: "oklch(0.52 0.14 185)",
					dark: "oklch(0.58 0.14 185)",
				},
				"chart-2": {
					DEFAULT: "oklch(0.6 0.12 200)",
					dark: "oklch(0.65 0.12 200)",
				},
				"chart-3": {
					DEFAULT: "oklch(0.4 0.08 220)",
					dark: "oklch(0.7 0.18 160)",
				},
				"chart-4": {
					DEFAULT: "oklch(0.7 0.18 160)",
					dark: "oklch(0.55 0.2 140)",
				},
				"chart-5": {
					DEFAULT: "oklch(0.65 0.16 140)",
					dark: "oklch(0.6 0.16 120)",
				},
				sidebar: {
					DEFAULT: "oklch(0.98 0 0)",
					dark: "oklch(0.05 0 0)",
				},
				"sidebar-foreground": {
					DEFAULT: "oklch(0.15 0 0)",
					dark: "oklch(0.95 0 0)",
				},
				"sidebar-primary": {
					DEFAULT: "oklch(0.52 0.14 185)",
					dark: "oklch(0.58 0.14 185)",
				},
				"sidebar-primary-foreground": {
					DEFAULT: "oklch(1 0 0)",
					dark: "oklch(0.05 0 0)",
				},
				"sidebar-accent": {
					DEFAULT: "oklch(0.96 0 0)",
					dark: "oklch(0.15 0 0)",
				},
				"sidebar-accent-foreground": {
					DEFAULT: "oklch(0.15 0 0)",
					dark: "oklch(0.95 0 0)",
				},
				"sidebar-border": {
					DEFAULT: "oklch(0.9 0 0)",
					dark: "oklch(0.15 0 0)",
				},
				"sidebar-ring": {
					DEFAULT: "oklch(0.52 0.14 185)",
					dark: "oklch(0.58 0.14 185)",
				},
			},
			borderRadius: {
				sm: "calc(0.5rem - 4px)",
				md: "calc(0.5rem - 2px)",
				lg: "0.5rem",
				xl: "calc(0.5rem + 4px)",
			},
		},
	},
	plugins: [],
};
