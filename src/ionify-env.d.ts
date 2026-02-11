/// <reference types="vite/client" />

// Phase 5.4.3: Global declarations for Ionify
declare global {
  // Define custom globals
  const __APP_VERSION__: string;
  const __API_URL__: string;

  // Extend ImportMetaEnv for Ionify env variables
  interface ImportMetaEnv {
    readonly MODE: string;
    readonly NODE_ENV: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly IONIFY_API_URL: string;
    readonly IONIFY_APP_NAME: string;
    readonly IONIFY_APP_DESCRIPTION: string;
    readonly IONIFY_ENABLE_MOCK: string;
    readonly IONIFY_DEBUG: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
