import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { assetUrl } from './utils/assetUrl'

document.documentElement.style.setProperty('--app-cursor', `url("${assetUrl('cursor-arrow-32.png')}") 6 6`)
document.documentElement.style.setProperty('--hero-header-image', `url("${assetUrl('header.png')}")`)
document.documentElement.style.setProperty(
  '--launch-signup-background-image',
  `url("${assetUrl('signup-background.png')}")`,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
