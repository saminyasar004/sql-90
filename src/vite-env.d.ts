/// <reference types="vite/client" />

interface ImportMetaEnv {
	VITE_BASE_URL: string;
	VITE_GOOGLE_CLIENT_ID: string;
	VITE_GOOGLE_CLIENT_SECRET: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
