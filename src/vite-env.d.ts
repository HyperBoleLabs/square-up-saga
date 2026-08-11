/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KLAVIYO_SITE_ID?: string
  readonly VITE_KLAVIYO_LIST_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
