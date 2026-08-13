import { useEffect, useState } from 'react'
import Home from './screens/Home'
import { fetchGistConfig } from './utils/fetchGistConfig'

type GistConfig = {
  showMike?: boolean
}

function App() {
  const [config, setConfig] = useState<GistConfig>({})

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const gistConfig = await fetchGistConfig()
        setConfig(gistConfig)
        console.log('Gist config:', gistConfig)
      } catch (error) {
        console.error('Failed to load gist config', error)
      }
    }

    void loadConfig()
  }, [])

  return <Home showMike={config.showMike ?? true} />
}

export default App
