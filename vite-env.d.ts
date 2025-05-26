/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PORT: string
  readonly VITE_PUBLIC_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}