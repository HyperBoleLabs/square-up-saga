import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { assetUrl } from './utils/assetUrl'

document.documentElement.style.setProperty('--app-cursor', `url("${assetUrl('cursor-arrow-32.png')}") 6 6`)
document.documentElement.style.setProperty('--hero-sky-image', `url("${assetUrl('hero-sky.png')}")`)
document.documentElement.style.setProperty('--hero-cloud-image', `url("${assetUrl('hero-cloud.png')}")`)
document.documentElement.style.setProperty(
  '--hero-foreground-image',
  `url("${assetUrl('hero-foreground.png')}")`,
)
document.documentElement.style.setProperty(
  '--fighter-section-background-image',
  `url("${assetUrl('fighter-background.png')}")`,
)
document.documentElement.style.setProperty(
  '--launch-signup-background-image',
  `url("${assetUrl('join-bg.png')}")`,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
