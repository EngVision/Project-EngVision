/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_SERVER_FILES_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
