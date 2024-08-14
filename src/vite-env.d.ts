/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // other environment variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
